import { Button, Drawer } from 'antd';
import { useState } from 'react';
import './index.scss'
import '../../styles/button.scss'
const MyDrawer = (props) => {
    const [open, setOpen] = useState(false);
    // 大家抽屉
    const showDrawer = () => {
        setOpen(true);
    };
    // 关闭抽屉
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className='drawer'>
            <div className='button'>
                <Button className='standard-main-btn' onClick={showDrawer}>
                    <span>帮</span><br />
                    <span>助</span>
                </Button>
            </div>
            <Drawer title="帮助" placement="right" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
};
export default MyDrawer;