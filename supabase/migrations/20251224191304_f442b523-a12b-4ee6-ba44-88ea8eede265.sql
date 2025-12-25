-- Create uploaded_documents table for user file uploads
CREATE TABLE public.uploaded_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tax_information_forms table for downloadable forms
CREATE TABLE public.tax_information_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'Other',
  year TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create draft_copies table for tax return drafts
CREATE TABLE public.draft_copies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create final_copies table for final tax returns
CREATE TABLE public.final_copies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.uploaded_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_information_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draft_copies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_copies ENABLE ROW LEVEL SECURITY;

-- RLS policies for uploaded_documents
CREATE POLICY "Users can view their own uploads" ON public.uploaded_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own uploads" ON public.uploaded_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own uploads" ON public.uploaded_documents FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for tax_information_forms (public read for authenticated users)
CREATE POLICY "Authenticated users can view forms" ON public.tax_information_forms FOR SELECT USING (auth.uid() IS NOT NULL);

-- RLS policies for draft_copies
CREATE POLICY "Users can view their own drafts" ON public.draft_copies FOR SELECT USING (auth.uid() = user_id);

-- RLS policies for final_copies
CREATE POLICY "Users can view their own finals" ON public.final_copies FOR SELECT USING (auth.uid() = user_id);

-- Create storage bucket for user uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('user-documents', 'user-documents', false);

-- Storage policies
CREATE POLICY "Users can upload their own documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view their own documents" ON storage.objects FOR SELECT USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own documents" ON storage.objects FOR DELETE USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create public bucket for tax forms
INSERT INTO storage.buckets (id, name, public) VALUES ('tax-forms', 'tax-forms', true);
CREATE POLICY "Anyone can view tax forms" ON storage.objects FOR SELECT USING (bucket_id = 'tax-forms');