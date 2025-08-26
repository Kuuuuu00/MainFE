import axios from "axios";
import { useNavigate } from "react-router-dom";

import useRegisterApi from "@/hooks/register/useRegisterApi";
import { ErrorResponse } from "@/types/common/apiResponse.type";

//useRegister는 mutateAsync를 감싸서 에러처리와 라우팅 담당

export const useRegister = () => {
  const navigate = useNavigate();
  const { postRegisterMutation } = useRegisterApi();

  const register = async (nickname: string) => {
    try {
      await postRegisterMutation.mutateAsync(nickname);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        throw error.response?.data.code;
      }
      throw error;
    }
  };

  return { register, postRegisterMutation };
};

export default useRegister;
