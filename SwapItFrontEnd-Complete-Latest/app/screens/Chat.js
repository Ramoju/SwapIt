import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import authStorage from "../auth/authStorage";
import DEFS from '../config/defaults';

function Chat(props) {
    const [localUser, setLocalUser] = useState({
        uid: '',
        name: '',
        email: ''
    });

    const paramsData = props.route.params
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const loadUser = async () => {
        const local = await authStorage.getLocalId();
        setLocalUser(JSON.parse(local))
        setIsUserLoaded(true)
        if (paramsData.isNew)
            loadMessage(paramsData.feed.id + ':-:' + paramsData.user.uid)
        else
            loadMessage(paramsData.chat.roomId)
    }

    const loadMessage = (roomId) => {
        fetch(DEFS.baseUrl + '/chats/' + roomId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Rsponse", res.data)
                if (res.success === true && res.data && res.data.messages.length>0) {
                    let sortedCars1 = res.data.messages.sort((a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt));

                    setMessages(sortedCars1);
                } else {
                    console.log(res.message);
                }
            })
            .catch((error) => {
                Alert.alert(error.message);
                console.error(error)
            })
    }
    useEffect(() => {
        props.navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            },

        });
        return () => props.navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, [props.navigation])


    const onSend = (newMessages = []) => {

        var apiParams = null

        if (paramsData.isNew) {
            apiParams = {
                feedId: paramsData.feed.id,
                userId: paramsData.user.uid,
                userName: paramsData.user.name,
                feedTitle: paramsData.feed.title,
                ownerID: paramsData.feed.createdBy.uId,
                ownerName: paramsData.feed.createdBy.name,
                message: {}
            }
        } else {
            apiParams = {
                feedId: paramsData.chat.feedId,
                userId: paramsData.chat.senderID,
                userName: paramsData.chat.senderName,
                feedTitle: paramsData.chat.feedTitle,
                ownerID: paramsData.chat.ownerID,
                ownerName: paramsData.chat.ownerName,
                message: {}
            }
            apiParams.messages = [];
        }

        apiParams.message = {
            text: newMessages[0].text,
            user: newMessages[0].user,
            createdAt: newMessages[0].createdAt
        }

        console.log('apiParams', apiParams)


        fetch(DEFS.baseUrl + '/chats', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiParams)
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Rsponse", res.message)
                if (res.success === true) {
                    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
                } else {
                    Alert.alert(res.message);
                }
            })
            .catch((error) => {
                Alert.alert(error.message);
                console.error(error)
            })


    };

    { !isUserLoaded && loadUser() }

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: localUser.uid,
                name: localUser.name,
                avatar: 'https://ui-avatars.com/api/?background=fc5c65&color=fff&rounded=true&name=' + (localUser ? localUser.name : ''),
            }}
            alignTop
            alwaysShowSend
            scrollToBottom
            showUserAvatar
            renderAvatarOnTop
            renderUsernameOnMessage
            bottomOffset={26}
            onPressAvatar={console.log}
            // messagesContainerStyle={{ backgroundColor: 'indigo' }}
            parsePatterns={(linkStyle) => [
                {
                    pattern: /#(\w+)/,
                    style: linkStyle,
                    onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                },
            ]}
        />
    );

}

export default Chat;