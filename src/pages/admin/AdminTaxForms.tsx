import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Upload, Search, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

interface TaxForm {
  id: string;
  category: string;
  year: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

const categories = ['Tax Information Form'];
const years = ['2025', '2024', '2023', '2022'];

const AdminTaxForms = () => {
  const [forms, setForms] = useState<TaxForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCategory, setSelectedCategory] = useState('Tax Information Form');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tax_information_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setForms(data || []);
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast.error('Failed to load tax forms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);

    try {
      for (const file of selectedFiles) {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `tax-forms/${selectedYear}/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('tax-forms')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Insert record
        const { error: insertError } = await supabase
          .from('tax_information_forms')
          .insert({
            category: selectedCategory,
            year: selectedYear,
            file_name: file.name,
            file_path: filePath,
          });

        if (insertError) throw insertError;
      }

      toast.success('Files uploaded successfully');
      setSelectedFiles([]);
      fetchForms();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (form: TaxForm) => {
    if (!confirm('Are you sure you want to delete this form?')) return;

    try {
      // Delete from storage
      await supabase.storage
        .from('tax-forms')
        .remove([form.file_path]);

      // Delete record
      const { error } = await supabase
        .from('tax_information_forms')
        .delete()
        .eq('id', form.id);

      if (error) throw error;

      toast.success('Form deleted successfully');
      fetchForms();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete form');
    }
  };

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
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const filteredForms = forms.filter(form =>
    form.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.year.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Upload Tax Information Forms</h1>

        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">year:</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category:</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-[hsl(217,91%,60%)] bg-blue-50' : 'border-border hover:border-[hsl(217,91%,60%)]'}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-[hsl(217,91%,60%)]" />
              <p className="text-foreground font-medium">Drop your files here</p>
              <p className="text-muted-foreground text-sm mt-1">
                or <span className="text-[hsl(217,91%,60%)] hover:underline">click to upload</span>
              </p>
            </div>
          </div>

          <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
            {selectedFiles.length > 0 ? (
              <div className="w-full space-y-2">
                <p className="font-medium mb-4">Selected Files:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="w-32 h-32 mb-4 opacity-50">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" fill="#E3F2FD" />
                    <rect x="70" y="60" width="60" height="80" rx="4" fill="#2196F3" />
                    <rect x="80" y="70" width="40" height="4" fill="white" />
                    <rect x="80" y="80" width="40" height="4" fill="white" />
                    <rect x="80" y="90" width="30" height="4" fill="white" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-foreground">No Files Selected</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white px-8"
          >
            {uploading ? 'UPLOADING...' : 'UPLOAD'}
          </Button>
        </div>

        {/* Forms Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Uploaded Tax Forms</h2>

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
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredForms.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-amber-600">
                        No forms found
                      </td>
                    </tr>
                  ) : (
                    filteredForms.map((form, index) => (
                      <tr key={form.id} className="border-t border-border hover:bg-muted/50">
                        <td className="px-6 py-4 text-sm">{index + 1}</td>
                        <td className="px-6 py-4 text-sm">{form.category}</td>
                        <td className="px-6 py-4 text-sm">{form.year}</td>
                        <td className="px-6 py-4 text-sm">{form.file_name}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(form.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(form)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(form)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTaxForms;
