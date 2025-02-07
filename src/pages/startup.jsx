import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { useParams } from "react-router-dom";
import { getSingleStartup, getStartups } from "../api/apiStartup";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@radix-ui/react-select";
// import { updateHiringStatus } from "../api/apiJobs";
// import ApplyJobDrawer from "../components/apply-job";
import StartupCard from "../components/startup-card";

const StartupPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingStartup,
    data: startup,
    fn: fnStartup,
  } = useFetch(getSingleStartup, {
    startup_id: id,
  });

  // console.log(startup);


  const { 
    loading: loadingPitchStatus, 
    fn: fnPitchStatus 
  } = useFetch(updatePitchStatus);

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  useEffect(() => {
    if (isLoaded) fnStartup()
  }, [isLoaded]);

  if (!isLoaded || loadingStartup) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
      <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">{startup?.name}</h1>
      {/* <img src={startup?.company?.logo_url} className="h-12" alt={startup?.name} /> */}
    </div>

    <div className="flex justify-between">
      <div className="flex gap-2">
        <MapPinIcon />
        {startup?.location}
      </div>
      <div className="flex gap-2">
        <Briefcase /> Industry: {startup?.industry}
      </div>
      {/* <div className="flex gap-2">
       {startup?.isOpen ? (<><DoorOpen/> Open</> ): ( <><DoorClosed/> Closed</> )}
      </div> */}
    </div>

    <h2 className="text-2xl sm:text-3xl font-bold">About the startup</h2>
    <p className="sm:text-lg">{startup?.description}</p>

    {/* <h2 className="text-2xl sm:text-3xl font-bold">
      What we are looking for
    </h2>
    <MDEditor.Markdown source={startup?.requirements} className="bg-transparent sm:text-lg"/> */}

    {/* render applications */}
    {/* {startup?.recruiter_id !== user?.id && (
      <ApplystartupDrawer startup={startup} user={user} fetchstartup={fnstartup} applied={startup?.applications?.find((ap) => ap.candidate_id === user.id)} />
    )}

    {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
    {startup?.applications?.length > 0 && startup?.recruiter_id === user?.id && (
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
        {startup?.applications.map((application)=>{
          return <ApplicationCard key={application.id} application={application} />
        })}
      </div>
    )} */}

    {/* hiring status */}
    {user?.unsafeMetadata?.role === "Investor"  && (
      <Select onValueChange={handleStatusChange}>
      <SelectTrigger className={`w-full ${startup?.isOpen ? "bg-green-950" : "bg-red-950"}`}>
        <SelectValue placeholder={"Hiring Status " + (startup?.isOpen ? "( Open )" : "( Closed )")}
        />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="open">
          Open
        </SelectItem>
        <SelectItem value="closed">
          Closed
        </SelectItem>
      </SelectContent>
    </Select>
  )}
  
    </div>
  )
}



export default StartupPage