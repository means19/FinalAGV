import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agvData } from "@/data/agvs";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";


const AGVList = () => {
  const [agvs, setAgvs] = useState(agvData);

  // Hàm chuyển trạng thái connect/disconnect
  const toggleConnection = (id: string) => {
    setAgvs((prev) =>
      prev.map((agv) =>
        agv.id === id ? { ...agv, connected: !agv.connected } : agv
      )
    );
  };

  // Phân loại AGVs theo trạng thái kết nối
  const connectedAgvs = agvs.filter((agv) => agv.connected);
  const disconnectedAgvs = agvs.filter((agv) => !agv.connected);

  return (
    <div className="flex">
      {/* Danh sách AGVs đang kết nối */}
      <div className="flex-1 p-4">
        <h1 className="font-bold text-4xl pb-6">Connected AGVs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectedAgvs.map((agv) => (
            <AGVCard key={agv.id} agv={agv} onToggle={toggleConnection} />
          ))}
        </div>
      </div>

      {/* Disconnected AGVs sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 border-l h-screen overflow-y-auto">
        <div className="space-y-4">
          {disconnectedAgvs.map((agv) => (
            <AGVSidebarCard
              key={agv.id}
              agv={agv}
              onToggle={toggleConnection}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Card AGV hiển thị ở màn hình chính
const AGVCard = ({
  agv,
  onToggle,
}: {
  agv: any;
  onToggle: (id: string) => void;
}) => {
  return (
    <Card className="cursor-pointer hover:bg-slate-100 active:bg-slate-200">
      <CardHeader>
        <CardTitle>{agv.name}</CardTitle>
        <CardDescription>{agv.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Location:</strong> {agv.location}
        </p>
        <p>
          <strong>Battery:</strong> {agv.battery}%
        </p>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger>
            <button
              className="text-red-500 hover:text-red-700"
            >
              Disconnect
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to disconnect this AGV?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will turn off{" "}
                  this AGV and you can not take any action for this AGV until you turn it on again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => onToggle(agv.id)}
                >
                  Disconnect
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};


// Card AGV hiển thị ở sidebar
const AGVSidebarCard = ({
  agv,
  onToggle,
}: {
  agv: any;
  onToggle: (id: string) => void;
}) => {
  return (
    <Card className="cursor-pointer hover:bg-slate-100 active:bg-slate-200">
      <CardHeader>
        <CardTitle>{agv.name}</CardTitle>
        <CardDescription className="text-gray-500">
          Disconnected
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <button
          onClick={() => {
            onToggle(agv.id)}}
            
          className="text-green-500 hover:text-green-700"
        >
          Connect
        </button>
      </CardFooter>
    </Card>
  );
};

export default AGVList;
