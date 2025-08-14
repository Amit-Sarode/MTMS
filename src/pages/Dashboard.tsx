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
  
  if (!user) {
    // return <Navigate to="/login" />;
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="bg-white dark:bg-gray-800 p-4">
         <div className='text-gray-900 dark:text-gray-100'>
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