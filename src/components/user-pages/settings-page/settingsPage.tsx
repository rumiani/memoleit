import Sounds from "./sounds/sounds";
import LeitnerTextSelectionMode from "./leitnerTextSelectionMode/leitnerTextSelectionMode";
import ImportComponent from "./importData/import";
import ExportComponent from "./exportData/export";
import UserCount from "./userCount/userCount";
import ActivateWordsGroups from "./activateWordlists/activateWordlists";
export default function SettingsPage() {
  return (
    <div className="w-full max-w-xl mx-auto mb-24 flex flex-col gap-4 sm:my-8 p-4 border border-gray-300">
      <Sounds />
      <div className="w-full border-[0.5px] border-gray-200"></div>
      <LeitnerTextSelectionMode />
      <div className="w-full border-[0.5px] border-gray-200"></div>
      <ExportComponent />
      <div className="w-full border-[0.5px] border-gray-200"></div>
      <ImportComponent />
      <div className="w-full border-[0.5px] border-gray-200"></div>
      <ActivateWordsGroups/>
      <div className="w-full border-[0.5px] border-gray-200"></div>
      <UserCount />
    </div>
  );
}
