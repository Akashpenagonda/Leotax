import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { toast } from 'sonner';

interface FinalCopy {
  id: string;
  category: string;
  year: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

const FinalCopy = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [finals, setFinals] = useState<FinalCopy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingFinals, setLoadingFinals] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchFinals = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('final_copies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching finals:', error);
        toast.error('Failed to load final copies');
      } else {
        setFinals(data || []);
      }
      setLoadingFinals(false);
    };

    if (user) {
      fetchFinals();
    }
  }, [user]);

  const handleDownload = async (final: FinalCopy) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-documents')
        .download(final.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = final.file_name;
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

  const filteredFinals = finals.filter(final =>
    final.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    final.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    final.year.includes(searchQuery)
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
        <h1 className="text-2xl font-bold text-foreground">Download Final Form</h1>

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
                {loadingFinals ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : filteredFinals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-amber-600">
                      No matching results found
                    </td>
                  </tr>
                ) : (
                  filteredFinals.map((final, index) => (
                    <tr key={final.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4 text-sm">{final.category}</td>
                      <td className="px-6 py-4 text-sm">{final.year}</td>
                      <td 
                        className="px-6 py-4 text-sm text-[hsl(217,91%,60%)] cursor-pointer hover:underline"
                        onClick={() => handleDownload(final)}
                      >
                        {final.file_name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(final.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(final)}
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
          <span>1 - {filteredFinals.length} of {filteredFinals.length}</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinalCopy;
