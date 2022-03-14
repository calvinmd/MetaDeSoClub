import React, { useState, useContext } from 'react'
import { SmallAvatar } from '../images/avatars'
import { AddImageIcon, AddGifIcon, AddPollIcon, AddEmojiIcon } from '../images/svg/svgs'
import { GlobalContext } from '../context/GlobalState';
import submarine from '../submarine.svg'
import { create } from 'ipfs-http-client';
import { getAccount } from './getAccount'
import { CCContext } from "../context/CC";
import Web3 from 'web3';
import { nft_abi } from './config';

export const NewTweet = () => {

    const client = create('https://ipfs.infura.io:5001/api/v0')

    const profImageurl = 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png';

    const [content, setContent] = useState('');
    const { addTweet } = useContext(GlobalContext);
    const [creator, setCreator] = useState("")
    const [count, setCount] = useState(0)
    const [accounts, setAccounts] = useState('');
    const [balance, setBalance] = useState('')
    // const { getCreator } = useContext(CCContext)
    // const c = getCreator()
    // setCreator(c)
    const { getCreator } = useContext(CCContext)
    const c = getCreator()

    getAccount().then((account) => {
        setAccounts(account);
        setCount(count + 1)
    })

    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")




    // console.log(GlobalContext.getTweet(1))
    async function handleNewTweet() {

        // let formData = new FormData()
        // console.log(image)
        // formData.append('file', image)
        // console.log(formData)
        // // const response = await fetch('http://127.0.0.1:4000/api/upload', {
        // //     method: 'POST',
        // //     body: formData,
        // // })

        // // fetch("http://127.0.0.1:4000/api/upload", {
        // //     method: 'POST',
        // //     body: formData
        // // }).then(response => response.json())
        // //     .then(jsondata => console.log(jsondata))

        // const submitResponse = await fetch('http://127.0.0.1:4000/api/upload', {
        //     method: 'POST',
        //     body: formData,
        // }).then(response => response.json())
        //     .then(jsondata => console.log(jsondata))
        //     .catch(function (error) {
        //         console.log(error)
        //     })


        // console.log(response.json())


        addTweet(content)

    };
    // const [url, setUrl] = useState("")
    // const [ipfs, setIpfs] = useState("")

    // const [ipfsTweet, setIpfsTweet] = useState({

    //     id: 1,
    //     user: {
    //         name: 'User 1 ',
    //         image: 'https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png',
    //         handle: '@User1'
    //     },
    //     tweet: {
    //         content: '',
    //         image: '',

    //     }

    // })
    async function handleImageChange(e) {
        setImage(e.target.files[0])
        const file = e.target.files[0]


        try {
            const imageUploaded = await client.add(file)
            const fileUrl = `https://ipfs.infura.io/ipfs/${imageUploaded.path}`
            console.log(fileUrl)
            setUrl(fileUrl)
            setContent(fileUrl)


        }
        catch (error) {
            console.log(error)
        }

    }
    async function handleSubmarine(e) {
        var fileUrl = ''
        setImage(e.target.files[0])
        const file = e.target.files[0]


        try {
            const imageUploaded = await client.add(file)
            fileUrl = `https://ipfs.infura.io/ipfs/${imageUploaded.path}`
            console.log(fileUrl)
            setUrl(fileUrl)


        }
        catch (error) {
            console.log(error)
        }

        console.log(c)
        const web3 = new Web3(window.ethereum)
        const nft_instance = new web3.eth.Contract(nft_abi, "0x560e517269fd05f2da513501d1108bfc10b2364a")
        var a = ''
        try {
            a = await nft_instance.methods.balanceOf(accounts).call({ from: accounts })
            console.log(parseInt(a))
            setBalance(a)
        }
        catch (error) {
            console.log(error)
        }

        if ((parseInt(a)) >= 1) {
            setContent(fileUrl)
        }

        else {
            setContent("https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg")
        }
    }





    // setIpfsTweet({
    //     ...ipfsTweet, tweet: {
    //         content: "ABC",
    //         image: "pqr"
    //     }
    // })

    // if (url) {
    //     console.log(url)


    //     console.log(ipfsTweet)



    // }

    return (
        <div className="new-tweet">
            <div className="left">
                <SmallAvatar width="48" image={profImageurl} />
            </div>
            <div className="right">
                <div className="flex-align-center">

                    <span className="w-100">
                        <input className="w-100" placeholder="What's happening?" type="text" onChange={(event) => setContent(event.target.value)} /></span>
                </div>
                <div className="new-tweet-options">
                    <div className="add-icons" >
                        <label for="fileUpload" style={{ cursor: "pointer" }}><AddImageIcon /></label>
                        <input type='file' style={{ display: "none" }} id='fileUpload' onChange={handleImageChange} />
                        <label for="gifUpload" style={{ cursor: "pointer" }}>
                            <AddGifIcon /></label>
                        <input type='file' style={{ display: "none" }} id='gifUpload' />

                        <AddPollIcon />
                        <AddEmojiIcon />
                        {/* <a href='https://app.submarine.me/' target="_blank">  */}

                        <label for="sub" style={{ cursor: "pointer" }}>
                            <img src={submarine} width='40px' height='40px' padding-bottom="10px" style={{ cursor: "pointer" }}
                            ></img></label>
                        <input type='file' style={{ display: "none" }} id='sub' onChange={handleSubmarine} />

                        {/* </a> */}
                    </div>
                    <div className="tweet" onClick={handleNewTweet}>
                        <div className="btn tweet-btn text-center">Tweet</div>
                    </div>
                </div>
            </div>

        </div>
    )

}
