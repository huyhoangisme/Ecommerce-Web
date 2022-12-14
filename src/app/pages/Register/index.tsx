import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import useSignUp from 'app/components/Auth/useSignUp';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import InputField from 'app/components/Form/InputField';
import Title from 'app/components/Title';
import { useThemeContext } from 'app/themes/ThemeProvider';
import React from 'react';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
interface SignUpPayLoad {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
const schema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng điền vào mục này'),
  email: yup.string().trim().required('Vui lòng điền vào mục này'),
  password: yup.string().trim().required('Vui lòng điền vào mục này'),
  confirmPassword: yup.string().trim().required('Vui lòng điền vào mục này'),
});

export const Register = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { loading, signUpSuccess, signUp } = useSignUp();
  if (loading) return <Spinner />;
  if (signUpSuccess) navigate('/login');
  const handleSubmit = (data: SignUpPayLoad) => {
    signUp && signUp(data);
  };

  return (
    <Box>
      <Center>
        <Box w={400} p={30} marginY="40px" border={'1px solid #EBEBEB'} className="shadow-lg">
          <Box className="text-center">
            <Title title="Đăng ký" fontSize="26px" />
            <Text fontSize={14} mt="10px" mb="20px">
              Đã có tài khoản, đăng nhập{' '}
              <span className="text-[#ff5c00]">
                <Link to="/login">tại đây</Link>
              </span>
            </Text>
          </Box>
          <Form validationSchema={schema} onSubmit={handleSubmit}>
            <Box className="space-y-4 w-full">
              <InputField name="name" placeholder="Họ và tên" bgColor="#EBEBEB" />
              <InputField name="email" placeholder="Email" bgColor="#EBEBEB" />
              <InputField name="password" placeholder="Mật khẩu" type="password" bgColor="#EBEBEB" />
              <InputField name="confirmPassword" placeholder="Nhập lại mật khẩu" type="password" bgColor="#EBEBEB" />
              <Button type="submit" variant="button-outline" bg="#333">
                Đăng ký
              </Button>
            </Box>
          </Form>
          <Box className="text-[14px] text-center">
            <Text mt="15px">Hoặc đăng nhập bằng</Text>
            <Box className="flex space-x-4  m-[20px]">
              <Button
                variant="button-outline"
                bg={theme.primary}
                fontSize={12}
                leftIcon={<FaFacebookSquare fontSize="20px" />}
              >
                Facebook
              </Button>
              <Button
                variant="button-outline"
                bg={theme.bgColor}
                fontSize={12}
                leftIcon={<AiOutlineGooglePlus fontSize="20px" />}
              >
                Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};
