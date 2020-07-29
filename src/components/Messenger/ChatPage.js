import React, { useEffect, useState } from "react";
import "./chatpage.css";
import { useDispatch, useSelector } from "react-redux";
import { NewMessage, getmsgs } from "../../Redux/actions";
import Loader from "../common/Loader";
import socketIOClient from "socket.io-client";
const config = { baseUrl: process.env.REACT_APP_BASE_URL };

const ChatPage = ({ userId }) => {
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const User = currentUser.data;
    const [Input, setInput] = useState("");
    const dispatch = useDispatch();
    const [Rece, setRece] = useState();
    const [received, setreceived] = useState();
    const [Error, seError] = useState(false);
    const [Loading, setLoading] = useState(false);

    const Socket = socketIOClient(config.baseUrl);

    useEffect(() => {
        let Mount = true;
        window.scrollTo(0, 0);
        setLoading(true);
        let Err = false;
        let Res = [];
        const starter = () => {
            dispatch(getmsgs({ receiver: userId }))
                .then((res) => {
                    if (Mount && res && res.data !== undefined) {
                        if (res.data.receiver !== undefined) {
                            setreceived(res.data.Messages);
                            Res = res.data.receiver;
                            setRece(res.data.receiver);
                            if (res.data.receiver.email === User.data.email) {
                                seError(true);
                                Err = true;
                            }
                        } else {
                            seError(true);
                            Err = true;
                        }
                        setLoading(false);
                    }
                })
                .then(() => {
                    if (Mount && !Err) {
                        const msgbox = document.getElementById("message-box");
                        msgbox.scrollTop = msgbox.scrollHeight;
                    }
                });
        };
        starter();

        Socket.on("msgToClient", (message) => {
            if (
                (message.UserMail === User.data.email &&
                    message.SenderId === Res.email) ||
                (message.UserMail === Res.email &&
                    message.SenderId === User.data.email)
            ) {
                starter();
            }
        });
        return () => {
            Mount = false;
        };
    }, [dispatch, userId, User.data.email]);

    const isNullOrWhiteSpace = (str) => {
        return !str || str.length === 0 || /^\s*$/.test(str);
    };

    const sendMsg = () => {
        if (!isNullOrWhiteSpace(Input)) {
            setInput("");
            dispatch(NewMessage({ msg: Input, receiver: userId })).then(
                (res) => {
                    if (!Error) {
                        const msgbox = document.getElementById("message-box");
                        msgbox.scrollTop = msgbox.scrollHeight;
                    }
                    Socket.emit("msgToServer", {
                        UserMail: User.data.email,
                        SenderId: Rece.email,
                        data: Input,
                    });
                }
            );
        }
    };

    return (
        <div className="items-center px-3">
            {!Error ? (
                <>
                    {Loading && <Loader msg={"Loading chat..."} />}
                    <div className={`${Loading ? "hidden" : ""}`}>
                        <div className="main-card  mt-16 w-full md:w-1/2 lg:w-2/5">
                            <div className="main-title flex py-3 px-4 bg-green-700 text-sm lg:text-lg font-bold">
                                <span className="w-1/2 ">
                                    {Rece && (
                                        <p className="truncate">{Rece.name}</p>
                                    )}
                                    {Rece && (
                                        <p className="truncate font-semibold text-xs lg:text-sm">
                                            {Rece.email}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="chat-area" id="message-box">
                                {received &&
                                    received.map((value, id) => {
                                        return (
                                            <div key={id + 1}>
                                                {value.author ===
                                                User.data.email ? (
                                                    <div className="chat-message-div">
                                                        <span
                                                            style={{
                                                                flexGrow: 1,
                                                            }}></span>
                                                        <div className="chat-message">
                                                            {value.msg}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="chat-message-div">
                                                        <div className="chat-message">
                                                            {value.msg}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="input-div flex flex-row" id="end">
                                <input
                                    className="input-message text-black w-5/6"
                                    name="message"
                                    type="text"
                                    id="message"
                                    value={Input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                    }}
                                    onKeyPress={(e) => {
                                        if (13 === (e.keyCode || e.which)) {
                                            sendMsg();
                                        }
                                    }}
                                />
                                <button
                                    className="input-send bg-green-700 mr-2 items-center text-center"
                                    onClick={sendMsg}>
                                    <svg className="ml-3 h-6 w-6">
                                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-2xl m-0 m-auto text-center text-red-600 ml-5 font-bold">
                    Oops an error occured
                </div>
            )}
        </div>
    );
};

export default ChatPage;
