import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Stats {
  totalUsers: number;
  totalDownloads: number;
  totalFilesUpload: number;
}

const COLORS = ['hsl(217, 91%, 60%)', 'hsl(142, 71%, 45%)', 'hsl(0, 84%, 60%)'];

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDownloads: 0,
    totalFilesUpload: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total users from profiles
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get total downloads (draft + final copies)
        const { count: draftsCount } = await supabase
          .from('draft_copies')
          .select('*', { count: 'exact', head: true });

        const { count: finalsCount } = await supabase
          .from('final_copies')
          .select('*', { count: 'exact', head: true });

        // Get total files uploaded
        const { count: uploadsCount } = await supabase
          .from('uploaded_documents')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalUsers: usersCount || 0,
          totalDownloads: (draftsCount || 0) + (finalsCount || 0),
          totalFilesUpload: uploadsCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const barData = [
    { name: 'Total Users', count: stats.totalUsers, fill: 'hsl(0, 84%, 85%)' },
    { name: 'Total Downloads', count: stats.totalDownloads, fill: 'hsl(217, 91%, 85%)' },
    { name: 'Total Files Upload', count: stats.totalFilesUpload, fill: 'hsl(45, 93%, 75%)' },
  ];

  const pieData = [
    { name: 'Total Users', value: stats.totalUsers },
    { name: 'Total Downloads', value: stats.totalDownloads },
    { name: 'Total Files Upload', value: stats.totalFilesUpload },
  ];

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      bgColor: 'bg-blue-100',
      image: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <circle cx="50" cy="25" r="15" fill="hsl(217, 91%, 60%)" />
          <path d="M25 75 Q50 55 75 75" fill="hsl(217, 91%, 60%)" />
          <rect x="35" y="45" width="30" height="25" rx="5" fill="hsl(217, 91%, 70%)" />
        </svg>
      ),
    },
    {
      title: 'Total Downloads',
      value: stats.totalDownloads,
      bgColor: 'bg-green-100',
      image: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <rect x="20" y="20" width="25" height="40" rx="3" fill="hsl(0, 84%, 60%)" />
          <rect x="50" y="30" width="25" height="30" rx="3" fill="hsl(0, 84%, 70%)" />
          <circle cx="70" cy="25" r="12" fill="hsl(0, 60%, 80%)" />
        </svg>
      ),
    },
    {
      title: 'Total Files Upload',
      value: stats.totalFilesUpload,
      bgColor: 'bg-orange-100',
      image: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <circle cx="50" cy="50" r="20" fill="hsl(280, 60%, 60%)" />
          <rect x="60" y="20" width="15" height="20" rx="2" fill="hsl(217, 91%, 60%)" />
          <path d="M30 60 L50 30 L70 60" fill="hsl(45, 93%, 60%)" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${card.bgColor} rounded-xl p-6 flex items-center justify-between`}
            >
              <div>
                {card.image}
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-foreground">{card.title}</p>
                <p className="text-4xl font-bold text-foreground">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Graphical Reports */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Graphical Reports</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(0, 84%, 85%)" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex justify-center mb-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[0] }}></div>
                    <span>Total Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[1] }}></div>
                    <span>Total Downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[2] }}></div>
                    <span>Total Files Upload</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
