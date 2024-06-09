type USER = {
  _id: string;
  name: string;
  employeeId: string;
  employeeType: string;
  mobileNo: string;
  email: string;
  joiningDate: Date;
  leads: string[];
};

type ADMIN = {
  _id: string;
  name: string;
  employeeId: string;
  employeeType: string;
  mobileNo: string;
  email: string;
  joiningDate: Date;
  leads: string[];
};

interface AuthContextTypeAdmin {
  admin?: ADMIN;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  isFetched: boolean;
}
interface AuthContextTypeUser {
  user?: USER;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  isFetched: boolean;
}

interface RouteTypeContextInterface {
  type: number;
  setType: React.Dispatch<React.SetStateAction<number>>;
}
