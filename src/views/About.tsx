import React, { useCallback, useMemo, useState } from "react";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { updateText } from "../store/about";
import { Input } from "antd";

interface Props {
    text: any,
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    [key: string]: any,
}
const AboutInput = React.memo((props: Props) => {
    // const { text } = useSelector((state: RootState) => state.about);
    // const dispatch = useDispatch();
    console.log(props.text);
    return (
        <>
            <p>{props.text}</p>
            <Input
                style={{ "width": "200px" }}
                value={props.text}
                placeholder="输入文案"
                onChange={props.handlerChange} />
        </>


    );
});

const About: React.FC = () => {
    const [val, setValue] = useState<string>("");
    const { text } = useSelector((state: RootState) => state.about);
    const dispatch = useDispatch();

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = (e.target as HTMLInputElement).value;
        dispatch(updateText(val));
    };
    const memoHandlerChange = useCallback(handlerChange, [text]);

    const AboutInputText = useMemo(() => {
        return text;
    },[text]);
    return (
        <div>
            <div>
                输入文案：
                <AboutInput
                    text={AboutInputText}
                    handlerChange={memoHandlerChange} />
                
            </div>
            <hr />
            <div>
                <Input
                    style={{ "width": "200px" }}
                    value={val}
                    placeholder="输入文案"
                    onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
};
export default About;