import Dashboard from "./admin/dashboard/Dashboard";

//project
import Project from "./admin/project/Project";
import ClientAllProjects from "./admin/project/ClientAllProjects";


//rfq
import RFQ from "./admin/rfq/RFQ";
import AddRFQ from "./admin/rfq/AddRFQ";

//rfi
import RFI from "./admin/rfi/RFI";
import AllSentRFI from "../staff/admin/rfi/AllSentRFI";
import AllReceivedRFI from "./admin/rfi/AllReceivedRFI";
import {ClientCreateRFI} from "../client/admin/rfi/CreateRFI";
import GetSentRFI from "../staff/admin/rfi/GetSentRFI";
//submittals
import Submittals from "./admin/submittals/Submittals";
import AllReceivedSubmittals from "./admin/submittals/AllReceivedSubmittals";
import AllSubmittals from "./admin/submittals/AllSubmittals";
import GetSentSubmittals from "./admin/submittals/GetSentSubmittals";
import SendSubmittals from "./admin/submittals/SendSubmittals";

//team
import Team from "./admin/team/Team";

//changeOrder
import ChangeOrder from "./admin/co/ChangeOrder";

export {
  Dashboard,
  Project,
  ClientAllProjects,
  AllSentRFI,
  AllReceivedRFI,
  ClientCreateRFI,
  GetSentRFI,
  RFQ,
  AddRFQ,
  RFI,
  Submittals,
  ChangeOrder,
  Team,
  AllReceivedSubmittals,
  AllSubmittals,
  GetSentSubmittals,
  SendSubmittals,
};
