import axios from "@/apis/instance";

export const registerApi = async (nickname: string) => {
  try {
    const response = await axios.post("/api/v1/auth/signup", {
      nickname,
    });
    return response.data;
  } catch (error) {
    alert("회원가입에 실패했습니다.");
    console.log(error);
  }
};
