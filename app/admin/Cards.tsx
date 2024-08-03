// components/Cards.js
import React, { Children } from "react";

interface CardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const Card = ({ title, content, icon }: CardProps) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 min-w-72">
    <div className="flex items-center mb-3">
      <div className="w-12 h-12 flex items-center justify-center bg-blue-200 rounded-full mr-3">
        {icon}
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
    <p>{content}</p>
  </div>
);

const Cards = () => (
  <div className="flex flex-wrap gap-4 ml-20">
    <Card
      title="Books"
      content="No:10"
      icon={<span className="text-2xl">📈</span>}
    />
    <Card
      title="Categories"
      content="No:10"
      icon={<span className="text-2xl">📊</span>}
    />
    <Card
      title="Users"
      content="No:10"
      icon={<span className="text-2xl">📚</span>}
    />
  </div>
);

export default Cards;
