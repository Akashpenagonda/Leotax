import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { toast } from 'sonner';

interface DraftCopy {
  id: string;
  category: string;
  year: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

const DraftCopy = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<DraftCopy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('draft_copies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching drafts:', error);
        toast.error('Failed to load draft copies');
      } else {
        setDrafts(data || []);
      }
      setLoadingDrafts(false);
    };

    if (user) {
      fetchDrafts();
    }
  }, [user]);

  const handleDownload = async (draft: DraftCopy) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-documents')
        .download(draft.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = draft.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const filteredDrafts = drafts.filter(draft =>
    draft.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.year.includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Download Draft Form</h1>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[hsl(217,91%,60%)] text-white">
                  <th className="px-6 py-4 text-left text-sm font-medium">S.No</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">File Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Datetime</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingDrafts ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : filteredDrafts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-amber-600">
                      No matching results found
                    </td>
                  </tr>
                ) : (
                  filteredDrafts.map((draft, index) => (
                    <tr key={draft.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4 text-sm">{draft.category}</td>
                      <td className="px-6 py-4 text-sm">{draft.year}</td>
                      <td 
                        className="px-6 py-4 text-sm text-[hsl(217,91%,60%)] cursor-pointer hover:underline"
                        onClick={() => handleDownload(draft)}
                      >
                        {draft.file_name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(draft.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(draft)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 text-sm text-muted-foreground">
          <span>Rows per page: 10</span>
          <span>1 - {filteredDrafts.length} of {filteredDrafts.length}</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DraftCopy;
