import React, { useState } from "react";

type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: Tab[];
};

const Tabs = ({ tabs }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex border-b border-gray-300">
                {tabs.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`flex-1 py-2 px-4 text-center cursor-pointer transition-colors ${activeTab === id
                            ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab(id)}
                        aria-selected={activeTab === id}
                        role="tab"
                        id={`tab-${id}`}
                        aria-controls={`tabpanel-${id}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div
                className="p-4"
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
            >
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default Tabs;
