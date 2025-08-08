import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import BomPage from '../components/BOM/BomPage';
import MrPage from '../components/MR/MrPage';
import SupplierStatusPage from '../components/Supplier/SupplierStatusPage';
import QaStatusPage from '../components/QA/QaStatusPage';
import TabNavigation from '../components/TabNavigation';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen dark:bg-black bg-white text-black">
      <Header onSearch={handleSearch} />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className='block lg:hidden'>
          <TabNavigation />
        </div>

        <div className="mt-6">
          <Routes>
            <Route path="/" element={<Navigate to="/bom" replace />} />
            <Route path="/bom" element={<BomPage searchTerm={searchTerm} />} />
            <Route path="/mr" element={<MrPage searchTerm={searchTerm} />} />
            <Route path="/supplier" element={<SupplierStatusPage searchTerm={searchTerm} />} />
            <Route path="/qa" element={<QaStatusPage searchTerm={searchTerm} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
