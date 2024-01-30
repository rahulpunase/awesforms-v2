import "./style.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PageSpecificBar from "@/components/layout/PageSpecificBar";
import { useInjector } from "@/store/store";

import FieldConfigRightBar from "./components/FieldConfigRightBar";
import FieldTabs from "./components/MetaFields/FieldTabs";
import StatingArea from "./components/Staging";
import { useFetchForm } from "./hooks/useFetchForm";
import BuilderSlice from "./store/builder/builder.slice";

const BuilderView = () => {
  useInjector({
    key: BuilderSlice.name,
    reducer: BuilderSlice.reducer,
  });
  useFetchForm();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row flex-grow">
        <PageSpecificBar className="border-r border-zinc-400">
          <FieldTabs />
        </PageSpecificBar>
        <div className="w-full h-full flex builder-background justify-between md:ml-[320px] sm:ml-0">
          <StatingArea />
        </div>
        <FieldConfigRightBar />
      </div>
    </DndProvider>
  );
};

export default BuilderView;
