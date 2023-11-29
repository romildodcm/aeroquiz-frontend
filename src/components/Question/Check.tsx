import { Check } from "phosphor-react";

const CheckIcon = ({ isSelected }: { isSelected: boolean }) => {
   return isSelected ? <Check size={18} className="text-blue-500"/> : null;
};

export default CheckIcon;
