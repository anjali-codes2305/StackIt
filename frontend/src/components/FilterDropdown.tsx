
import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

const FilterDropdown = ({ selectedTag, onTagChange }: FilterDropdownProps) => {
  const tags = [
    { value: "all", label: "All Questions" },
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "css", label: "CSS" },
    { value: "api", label: "API" },
    { value: "database", label: "Database" },
    { value: "authentication", label: "Authentication" },
    { value: "authentication", label: "Git" },
    { value: "authentication", label: "Github" },
  ];

  const selectedLabel = tags.find(tag => tag.value === selectedTag)?.label || "All Questions";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 rounded-xl"
        >
          <Filter className="w-4 h-4 mr-2" />
          {selectedLabel}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-800 border-slate-700 rounded-xl">
        {tags.map((tag) => (
          <DropdownMenuItem
            key={tag.value}
            onClick={() => onTagChange(tag.value)}
            className={`hover:bg-slate-700 cursor-pointer ${
              selectedTag === tag.value ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300'
            }`}
          >
            {tag.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
