import BaseAPi from "../BaseApi";
type HandleLoginDatatype = { email: string; password: string };
class LoginService extends BaseAPi {
  userLogin(data: HandleLoginDatatype) {
    return this.post("/auth/login", { params: data });
  }
}

export default new LoginService();
