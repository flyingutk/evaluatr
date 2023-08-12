import BaseAPi from "../BaseApi";

class UserService extends BaseAPi {
  fetchAgentUserProfile = (agent_id: number | string) => {
    return this.get(`/sales/agents/?agent_id=${agent_id}`);
  };
  updateUserLocation = (data: { agentId: number; latitude: string | number; longitude: number | string }) => {
    return this.post(`/sales/trackandtrace`, { params: data });
  };
}

export default new UserService();
