import { Container, Input, VStack, Heading, Box, useColorModeValue, Button, useToast } from '@chakra-ui/react';
import React from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
    const [newProduct, setNewProduct] = React.useState({
        name: "",
        description: "",
        price: "",
        image: ""
    });

    const toast = useToast()


    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        console.log("Success:", success);
        console.log("Message:", message);
        if (success) {
            toast({
                title: 'Product Created.',
                description: "Your product has been created successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Error.',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        setNewProduct({ name: "", price: "", image: "" });
    };

    return (
        <Container maxW={"1140px"} px={4}>
            <VStack
                spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box
                    w={"100%"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='imageUrl'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage