import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityLog {
  id: string;
  user_email: string;
  action: string;
  description: string;
  ip_address: string | null;
  browser_info: string | null;
  created_at: string;
}

const AdminActivities = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      // Get total count
      const { count } = await supabase
        .from('activity_logs')
        .select('*', { count: 'exact', head: true });

      setTotalCount(count || 0);

      // Get paginated data
      const from = (currentPage - 1) * rowsPerPage;
      const to = from + rowsPerPage - 1;

      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (searchQuery) {
        query = supabase
          .from('activity_logs')
          .select('*')
          .or(`user_email.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,action.ilike.%${searchQuery}%`)
          .order('created_at', { ascending: false })
          .range(from, to);
      }

      const { data, error } = await query;

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [currentPage, rowsPerPage, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalCount);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Activities</h1>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>

        {/* Activities Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[hsl(217,91%,60%)] text-white">
                  <th className="px-4 py-4 text-left text-sm font-medium">S.no</th>
                  <th className="px-4 py-4 text-left text-sm font-medium">Logged-In User</th>
                  <th className="px-4 py-4 text-left text-sm font-medium">IP Address</th>
                  <th className="px-4 py-4 text-left text-sm font-medium">Browser Info</th>
                  <th className="px-4 py-4 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-4 text-left text-sm font-medium">Time</th>
                  <th className="px-4 py-4 text-left text-sm font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : activities.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No activities found
                    </td>
                  </tr>
                ) : (
                  activities.map((activity, index) => (
                    <tr key={activity.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-4 text-sm">{startIndex + index}</td>
                      <td className="px-4 py-4 text-sm text-[hsl(217,91%,60%)]">
                        {activity.user_email}
                      </td>
                      <td className="px-4 py-4 text-sm">{activity.ip_address || '-'}</td>
                      <td className="px-4 py-4 text-sm">{activity.browser_info || '-'}</td>
                      <td className="px-4 py-4 text-sm">{formatDate(activity.created_at)}</td>
                      <td className="px-4 py-4 text-sm text-amber-600">{formatTime(activity.created_at)}</td>
                      <td className="px-4 py-4 text-sm max-w-xs truncate" title={activity.description}>
                        {activity.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select value={String(rowsPerPage)} onValueChange={(val) => {
              setRowsPerPage(Number(val));
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span>{startIndex} - {endIndex} of {totalCount}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminActivities;
