import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Upload, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

interface Document {
  id: string;
  category: string;
  year: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

type TabType = 'user-uploads' | 'drafts' | 'finals' | 'upload';

const categories = ['W2s', '1099s', '1098s', 'Last Year Tax Returns', 'Other'];
const documentCategories = ['Draft', 'Final'];
const years = ['2025', '2024', '2023', '2022'];

const AdminUserDetail = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { user: adminUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('user-uploads');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Upload form state
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCategory, setSelectedCategory] = useState('Draft');
  const [copyType, setCopyType] = useState<'Draft' | 'Final'>('Final');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const userName = location.state?.userName || 'User';
  const userEmail = location.state?.userEmail || '';
  const userPhone = location.state?.userPhone || '';

  const fetchDocuments = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      let data: Document[] = [];
      
      if (activeTab === 'user-uploads') {
        const { data: uploads, error } = await supabase
          .from('uploaded_documents')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        data = uploads || [];
      } else if (activeTab === 'drafts') {
        const { data: drafts, error } = await supabase
          .from('draft_copies')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        data = drafts || [];
      } else if (activeTab === 'finals') {
        const { data: finals, error } = await supabase
          .from('final_copies')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        data = finals || [];
      }

      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'upload') {
      fetchDocuments();
    }
  }, [userId, activeTab]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = async () => {
    if (!userId || selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);

    try {
      for (const file of selectedFiles) {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${userId}/${selectedYear}/${copyType}/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('user-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Insert into appropriate table
        if (copyType === 'Draft') {
          const { error: insertError } = await supabase
            .from('draft_copies')
            .insert({
              user_id: userId,
              category: selectedCategory,
              year: selectedYear,
              file_name: file.name,
              file_path: filePath,
            });
          if (insertError) throw insertError;
        } else {
          const { error: insertError } = await supabase
            .from('final_copies')
            .insert({
              user_id: userId,
              category: selectedCategory,
              year: selectedYear,
              file_name: file.name,
              file_path: filePath,
            });
          if (insertError) throw insertError;
        }

        // Log activity
        await supabase.from('activity_logs').insert({
          user_id: adminUser?.id,
          user_email: adminUser?.email || 'Admin',
          action: 'upload',
          description: `Leo Tax Filing Uploaded ${copyType} file Successfully for ${userName}`,
          ip_address: '',
          browser_info: navigator.userAgent.split(' ').pop() || '',
        });
      }

      toast.success('Files uploaded successfully');
      setSelectedFiles([]);
      // Switch to appropriate tab to show uploaded files
      setActiveTab(copyType === 'Draft' ? 'drafts' : 'finals');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-documents')
        .download(doc.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Delete from storage
      await supabase.storage
        .from('user-documents')
        .remove([doc.file_path]);

      // Delete from appropriate table based on active tab
      let error = null;
      if (activeTab === 'drafts') {
        const result = await supabase.from('draft_copies').delete().eq('id', doc.id);
        error = result.error;
      } else if (activeTab === 'finals') {
        const result = await supabase.from('final_copies').delete().eq('id', doc.id);
        error = result.error;
      } else {
        const result = await supabase.from('uploaded_documents').delete().eq('id', doc.id);
        error = result.error;
      }

      if (error) throw error;

      toast.success('File deleted successfully');
      fetchDocuments();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
    }
  };

  const tabs = [
    { id: 'user-uploads', label: 'USER UPLOADED DOCUMENTS' },
    { id: 'drafts', label: 'DRAFT UPLOADED DOCUMENTS' },
    { id: 'finals', label: 'FINAL UPLOADED DOCUMENTS' },
    { id: 'upload', label: 'UPLOAD DRAFT/FINAL DOCUMENTS' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          <Link to="/admin" className="hover:text-foreground">Home</Link>
          {' / '}
          <Link to="/admin/users" className="hover:text-foreground">Users Management</Link>
          {' / '}
          <span className="text-[hsl(217,91%,60%)]">{userName}</span>
        </div>

        {/* User Info */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
          <p className="text-muted-foreground">Ph No: {userPhone}</p>
          <p className="text-muted-foreground">mail: {userEmail}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={activeTab === tab.id 
                ? 'bg-[hsl(217,91%,60%)] text-white hover:bg-[hsl(217,91%,50%)]' 
                : ''
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'upload' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Draft Form Upload</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium mb-2">category:</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    {documentCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Copy Type:</label>
                <Select value={copyType} onValueChange={(val) => setCopyType(val as 'Draft' | 'Final')}>
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>
        ) : (
          <div className="space-y-4">
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
                    ) : documents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-amber-600">
                          No Files Uploaded...
                        </td>
                      </tr>
                    ) : (
                      documents.map((doc, index) => (
                        <tr key={doc.id} className="border-t border-border hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm">{index + 1}</td>
                          <td className="px-6 py-4 text-sm">{doc.category}</td>
                          <td className="px-6 py-4 text-sm">{doc.year}</td>
                          <td className="px-6 py-4 text-sm">{doc.file_name}</td>
                          <td className="px-6 py-4 text-sm">
                            {new Date(doc.created_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(doc)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(doc)}
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
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUserDetail;
