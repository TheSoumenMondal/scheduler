import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardComponentProps {
  name: string;
  date: string;
  handleClick: () => void;
}

export default function CardComponent({ name, date,handleClick }: CardComponentProps) {
  return (
    <Card className="border-2 hover:cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{date}</CardDescription>
      </CardContent>
    </Card>
  );
}
