import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

export default function MyUpload(props) {
    const {handleSuccessUpload}=props
    const setting = {
        name: 'file',
        maxCount: 1,
        accept: '.rar,.zip',
        action: 'http://localhost:3000/api2/upload',
        onChange(info) {
            const { status,response } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                handleSuccessUpload(response)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove() {
            handleSuccessUpload()
        },
    };
    return (
        <Dragger {...setting}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">选择文件或将文件拖放到该区域</p>
            {/* <a>模版下载</a> */}
            <p className="ant-upload-hint">
                支持rar、zip等格式，具体要求请点击 <a download="模版" href="template.zip" onClick={(e) => {
                    e.stopPropagation()
                }}>模版下载</a> 。您同样可以使用我们平台提供的默认数据，数据的介绍在数据说明选项中。
            </p>
        </Dragger>
    )
}
