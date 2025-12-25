import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDownloads: 0,
    totalUploads: 0,
    draftsReceived: 0,
    finalCopiesReceived: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      // Fetch upload count
      const { count: uploadCount } = await supabase
        .from('uploaded_documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch draft copies count
      const { count: draftCount } = await supabase
        .from('draft_copies')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch final copies count
      const { count: finalCount } = await supabase
        .from('final_copies')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch tax forms count (downloads)
      const { count: downloadCount } = await supabase
        .from('tax_information_forms')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalDownloads: downloadCount || 0,
        totalUploads: uploadCount || 0,
        draftsReceived: draftCount || 0,
        finalCopiesReceived: finalCount || 0,
      });
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Downloads',
      value: stats.totalDownloads,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
    {
      title: 'Total Uploads',
      value: stats.totalUploads,
      bgColor: 'bg-green-100',
      textColor: 'text-green-900',
    },
    {
      title: 'Total Drafts Received',
      value: stats.draftsReceived,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-900',
    },
    {
      title: 'Final Copies Received',
      value: stats.finalCopiesReceived,
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-900',
    },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${card.bgColor} rounded-xl p-6 shadow-sm`}
          >
            <h3 className={`text-lg font-semibold ${card.textColor}`}>{card.title}</h3>
            <p className={`text-4xl font-bold mt-2 ${card.textColor}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
