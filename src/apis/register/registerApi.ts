import { PostRegisterResponse } from "@/types/apis/register";
import { ApiResponse } from "@/types/common/apiResponse.type";

import axios from "@/apis/instance";

export const registerApi = async (
  nickname: string
): ApiResponse<PostRegisterResponse> => {
  return axios.post("/api/v1/auth/signup", { nickname }).then(res => res.data);
};

//APiResponse는 공통 응답 리스폰스 isSuccess, code, message, result
