import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import BasicFields from "./BasicFields";
const FieldTabs = () => {
  return (
    <div className="w-full pt-2">
      <Tabs className="w-full p-2" defaultValue="basic">
        <TabsList className="w-full justify-between p-0">
          <TabsTrigger value="basic">Basic Fields</TabsTrigger>
          <TabsTrigger value="advance">Advance Fields</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <BasicFields />
        </TabsContent>
        <TabsContent value="advance">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default FieldTabs;
