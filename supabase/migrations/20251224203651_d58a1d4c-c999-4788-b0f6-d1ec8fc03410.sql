-- Drop existing policies if any
DROP POLICY IF EXISTS "Admin users can view all user documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can upload to user documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can delete user documents" ON storage.objects;

-- Allow admins to view/download all files in user-documents bucket
CREATE POLICY "Admin users can view all user documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'user-documents' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow admins to upload files to user-documents bucket
CREATE POLICY "Admin users can upload to user documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'user-documents' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow admins to delete files from user-documents bucket
CREATE POLICY "Admin users can delete user documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'user-documents' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);