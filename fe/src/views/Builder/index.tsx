import "./style.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PageSpecificBar from "@/components/layout/PageSpecificBar";

import FieldConfigRightBar from "./components/FieldConfigRightBar";
import FieldTabs from "./components/MetaFields/FieldTabs";
import StatingArea from "./components/Staging";
import { useFetchForm } from "./hooks/useFetchForm";

const BuilderView = () => {
  useFetchForm();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row flex-grow">
        <PageSpecificBar className="border-r border-zinc-400">
          <FieldTabs />
        </PageSpecificBar>
        <div className="w-full h-full flex builder-background justify-between">
          <StatingArea />
          <FieldConfigRightBar />
        </div>
      </div>
    </DndProvider>
  );
};

export default BuilderView;
