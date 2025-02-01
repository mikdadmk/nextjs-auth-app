'use client';

import PageContainer from '@/components/(DashboardLayout)/components/container/PageContainer';
import { motion } from 'framer-motion';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 2xl:gap-8">
          {/* Sales Overview */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SalesOverview />
            </motion.div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="grid grid-cols-1 gap-6 2xl:gap-8">
              <div className="col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <YearlyBreakup />
                </motion.div>
              </div>
              <div className="col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <MonthlyEarnings />
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
