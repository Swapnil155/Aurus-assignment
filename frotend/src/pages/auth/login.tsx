import { Field } from '@/components/ui/field'
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import logo from '@/assets/logo.svg'
import { Center, HStack, Image, Input, Text, VStack } from "@chakra-ui/react"

const Login = () => {
    return (
        <VStack
            w={'100%'} h={'100vh'} bg={'#ffffff'}  >

            {/* <HStack boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'} w={'100%'} ps={8} h={'7%'} justifyContent={'flex-start'}>
                <Image w={50} src={logo} />
            </HStack> */}


            <HStack
                w={'100%'} h={'93%'} p={8} gap={8}>




                <Center display={{ base: 'none', md: 'flex' }} bg={'#02A0A033'} w={'50%'} h={'100%'} rounded={'3xl'}>
                    <Image w={250} src={logo} />
                </Center>





                <Center as={'form'} p={{ base: 4, md: 16 }} w={{ base: '100%', md: '50%' }} h={'100%'}>
                    <VStack gap={2} w={'100%'} alignItems={'flex-start'}>
                        <Text w={'100%'} textAlign={'center'} fontSize={'24px'} fontWeight={'normal'} color={'#313039'}>LOGIN</Text>

                        <VStack mt={6} gap={4} w={'full'}>
                            <Field
                                color={'#313039'}
                                label={'Enter Mobile Number'}
                                w={'100%'}
                            // invalid={!!errors.mobileNumber}
                            // errorText={errors.mobileNumber?.message}
                            >
                                <Input ps={3}
                                    //  {...register("mobileNumber", { required: "Mobile Number address is required" })}
                                    placeholder="Mobile Number Address"
                                />
                                {/* <Text as={'span'} w={'100%'} fontSize={'xs'} fontWeight={'normal'} color={'#686677'}>Forget password</Text> */}
                            </Field>
                            <Button
                                // loading={isLoading} 
                                mt={4}
                                size={'sm'}
                                bg={'#02A0A0'}
                                rounded={'md'}
                                w={'100%'}
                                color={'#ffffff'}
                                type="submit"
                            >
                                Send OTP
                            </Button>

                            <Text>Forgot password</Text>
                        </VStack>


                    </VStack>
                </Center>
                
                <Toaster />
            </HStack>

        </VStack>
    )
}

export default Login