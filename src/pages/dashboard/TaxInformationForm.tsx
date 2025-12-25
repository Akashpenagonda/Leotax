import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import { toast } from 'sonner';

interface TaxForm {
  id: string;
  category: string;
  year: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

const TaxInformationForm = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [forms, setForms] = useState<TaxForm[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingForms, setLoadingForms] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchForms = async () => {
      const { data, error } = await supabase
        .from('tax_information_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching forms:', error);
        toast.error('Failed to load forms');
      } else {
        setForms(data || []);
      }
      setLoadingForms(false);
    };

    if (user) {
      fetchForms();
    }
  }, [user]);

  const handleDownload = async (form: TaxForm) => {
    try {
      const { data, error } = await supabase.storage
        .from('tax-forms')
        .download(form.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = form.file_name;
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

  const filteredForms = forms.filter(form =>
    form.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.year.includes(searchQuery)
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Download Form List</h1>
          <div className="flex gap-2">
            <Button 
              className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white"
            >
              TAX INFORMATION FORM 2024 <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white"
            >
              TAX INFORMATION FORM 2025 <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

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
                </tr>
              </thead>
              <tbody>
                {loadingForms ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : filteredForms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-amber-600">
                      No matching results found
                    </td>
                  </tr>
                ) : (
                  filteredForms.map((form, index) => (
                    <tr key={form.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4 text-sm">{form.category}</td>
                      <td className="px-6 py-4 text-sm">{form.year}</td>
                      <td 
                        className="px-6 py-4 text-sm text-[hsl(217,91%,60%)] cursor-pointer hover:underline"
                        onClick={() => handleDownload(form)}
                      >
                        {form.file_name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(form.created_at).toLocaleString()}
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
          <span>1 - {filteredForms.length} of {filteredForms.length}</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaxInformationForm;
