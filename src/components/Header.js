import React from 'react'
import { Flex, Typography } from 'antd';

const CustomHeader =()=> {
    return <Flex>
        {/* Ufak bir margin ile baslik ortalanir */}
        <Typography.Title level={3} type='secondary' style={{ margin: 5 }}>
            Welcome back,Begüm
        </Typography.Title>
        <Flex align='center' gap="3rem">
            
            
        </Flex>
    </Flex>;
};
export default CustomHeader;
