import axios from "@/apis/instance";

export const registerApi = async (nickname: string) => {
  try {
    const response = await axios.post("/api/v1/auth/register-anonymous", {
      nickname,
    });
    localStorage.setItem("NapulNapul-accessToken", response.data.accessToken);
    localStorage.setItem("NapulNapul-refreshToken", response.data.refreshToken);
    return true;
  } catch (error) {
    alert("회원가입에 실패했습니다.");
    window.location.reload();
  }
};
