import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, ChevronRight, Database, Users, Briefcase, UserCheck, RefreshCw, Eye, EyeOff } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DatabaseRecord {
  key: string;
  value: any;
  type: 'freelancer' | 'client' | 'job' | 'category' | 'featured' | 'other';
}

export function DatabaseViewer() {
  const [records, setRecords] = useState<DatabaseRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['freelancers']));

  const initDemoData = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-382214ec/debug/init-demo-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to initialize demo data');
      }

      const data = await response.json();
      if (data.success) {
        alert(`Demo data created! You can now login with:\n\nFreelancer: 9876543210\nClient: 9876543211\n\nUse any password.`);
      } else {
        alert(data.message || 'Demo data already exists');
      }
      
      // Refresh the data
      fetchAllData();
    } catch (error) {
      console.error('Error initializing demo data:', error);
      alert('Failed to initialize demo data');
    }
  };



  const fetchAllData = async () => {
    setLoading(true);
    try {
      console.log('Fetching database data...');
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-382214ec/debug/all-data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      // Check if data has the expected structure
      if (!data || !Array.isArray(data.records)) {
        console.error('Invalid data structure:', data);
        throw new Error('Invalid data structure from server');
      }
      
      // Transform the data into categorized records
      const categorizedRecords: DatabaseRecord[] = data.records
        .filter((record: any) => {
          if (!record) {
            console.warn('Found null/undefined record');
            return false;
          }
          if (!record.key) {
            console.warn('Found record without key:', record);
            return false;
          }
          return true;
        })
        .map((record: any) => {
          let type: DatabaseRecord['type'] = 'other';
          const key = String(record.key || ''); // Ensure key is a string
          
          if (key.startsWith('freelancer:')) {
            type = 'freelancer';
          } else if (key.startsWith('client:')) {
            type = 'client';
          } else if (key.startsWith('job:')) {
            type = 'job';
          } else if (key.includes('category') || key.includes('categories')) {
            type = 'category';
          } else if (key.includes('featured')) {
            type = 'featured';
          }

          return {
            key: key,
            value: record.value,
            type
          };
        });

      console.log('Processed records:', categorizedRecords);
      setRecords(categorizedRecords);
    } catch (error) {
      console.error('Error fetching database data:', error);
      console.error('Full error details:', error);
      alert(`Failed to fetch database data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchAllData();
    }
  }, [isVisible]);

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const getRecordsByType = (type: DatabaseRecord['type']) => {
    return records.filter(record => record.type === type);
  };

  const formatValue = (value: any) => {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'freelancers': return <Users className="h-4 w-4" />;
      case 'clients': return <UserCheck className="h-4 w-4" />;
      case 'jobs': return <Briefcase className="h-4 w-4" />;
      case 'categories': return <Database className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Database
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Viewer
            </CardTitle>
            <CardDescription>
              View all data stored in your Supabase key-value database
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={fetchAllData}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              size="sm"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[70vh] px-6">
            <div className="space-y-4">
              {/* Debug Actions */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-3">Debug Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={initDemoData}
                    variant="outline"
                    size="sm"
                    className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                  >
                    🚀 Initialize Demo Data
                  </Button>
                </div>
                <div className="mt-3 text-sm text-yellow-700 space-y-1">
                  <div><strong>Demo Accounts:</strong></div>
                  <div>• Freelancer: <code>9876543210</code> (any password)</div>
                  <div>• Client: <code>9876543211</code> (any password)</div>
                  <div className="text-xs mt-2 opacity-75">Click the button above if no users exist, then try logging in.</div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {getRecordsByType('freelancer').length}
                  </div>
                  <div className="text-sm text-blue-700">Freelancers</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {getRecordsByType('client').length}
                  </div>
                  <div className="text-sm text-green-700">Clients</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {getRecordsByType('job').length}
                  </div>
                  <div className="text-sm text-orange-700">Jobs</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {records.length}
                  </div>
                  <div className="text-sm text-purple-700">Total Records</div>
                </div>
              </div>

              {/* Data Sections */}
              {['freelancers', 'clients', 'jobs', 'categories', 'other'].map(sectionType => {
                const sectionRecords = getRecordsByType(sectionType as DatabaseRecord['type']);
                if (sectionRecords.length === 0) return null;

                return (
                  <Collapsible
                    key={sectionType}
                    open={openSections.has(sectionType)}
                    onOpenChange={() => toggleSection(sectionType)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto text-left"
                      >
                        <div className="flex items-center gap-2">
                          {getSectionIcon(sectionType)}
                          <span className="capitalize font-medium">{sectionType}</span>
                          <Badge variant="secondary">{sectionRecords.length}</Badge>
                        </div>
                        {openSections.has(sectionType) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-3">
                        {sectionRecords.map((record, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-400">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                  {record.key}
                                </code>
                                <Badge variant="outline" className="text-xs">
                                  {record.type}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                                {formatValue(record.value)}
                              </pre>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

              {records.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data found in the database</p>
                  <Button onClick={fetchAllData} className="mt-4" variant="outline">
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}