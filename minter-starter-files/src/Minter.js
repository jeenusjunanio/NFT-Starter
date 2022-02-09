import { useEffect, useState } from "react";
import axios from 'axios';
import { connectWallet, getCurrentWalletConnected, mintNFT, getConnectedData } from "./utils/interact.js";
const Minter = (props) => {

  //State variables
  const [assetsData, setAssets] = useState([]);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    const {wal_data, wal_status} = await getConnectedData(address);
    
    
        setAssets(wal_data);
        setWallet(address)
        console.log(url)
        setStatus(status);
        addWalletListener();
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    const {wal_data, wal_status} = await getConnectedData(walletResponse.address);
    setAssets(wal_data);
  };
  const disConnectWalletPressed = async () => { //TODO: implement
    console.log('in disconnect');
    setAssets([]);
    setStatus('');
    setWallet('');
  };

  const onMintPressed = async (waladdress) => { //TODO: implement
    // const { status } = await mintNFT(url, name, description);
    // setStatus(status);
    // testing the opensea 
    // const url = `https://api.opensea.io/api/v1/assets?owner=${waladdress}`;
    // //making axios POST request to Pinata ⬇️
    // return axios 
    //     .get(url, {
    //         headers: {
    //           Accept: 'application/json'
    //         }
    //     })
    //     .then(function (response) {
    //       console.log(response.data.assets)
    //       setAssets(response.data.assets);
    //     })
    //     .catch(function (error) {
    //         console.log(error)
    //     });
  };
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
        } else {
          setWallet("");
          setAssets([]);
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  return (
    <div className="Minter">
      {walletAddress.length <= 0 ?
      (<button id="walletButton" onClick={connectWalletPressed}>
         
          <span>Connect Wallet</span>
        
      </button>): ''
      }

      {/* <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form> */}

      <p id="status">
        {status}
      </p>
      <div>
        {
          assetsData.map(function(assetData, index){
      
            return (
              <div key={assetData._id} assetData={assetData.name} className="product_card">
                
                <div className="container emp-profile">
                  <div className="row">
                      <div className="col-md-4">
                          <div className="profile-img">
                              <img src={assetData.image_preview_url} alt=""/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="profile-head">
                                      <h5>
                                      <a href={assetData.permalink} target="blank">{assetData.name}</a>
                                      </h5>
                                      <h6>
                                      <a href={'https://opensea.io/collection/'+assetData.collection.slug} target="blank">{assetData.collection.name}</a>
                                      </h6>
                                      <p className="proile-rating">CREATED AT : <span>{assetData.collection.created_date}</span></p>
                             
                          </div>
                      </div>
                      <div className="col-md-2">
                          <input type="submit" className="profile-edit-btn" name="btnAddMore" onClick={disConnectWalletPressed} value={walletAddress.length > 0 ? (
          "Disconnect: XXX" +
          
          String(walletAddress).substring(38)
        ):''}/>
                      </div>
                  </div>
                  <div className="row">
                      
                      <div className="col-md-12">
                          <div className="tab-content profile-tab" id="myTabContent">
                              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                          <div className="row">
                                              <div className="col-md-12 p-5">
                                                  <h1>Asset contract</h1>
                                              </div>
                                          </div>
                                      
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <label>Address</label>
                                              </div>
                                              <div className="col-md-8">
                                                  <p>{assetData.asset_contract.address}</p>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <label>Asset contract type</label>
                                              </div>
                                              <div className="col-md-8">
                                                  <p>{assetData.asset_contract.asset_contract_type}</p>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <label>Buyer fee basis points</label>
                                              </div>
                                              <div className="col-md-8">
                                                  <p>{assetData.asset_contract.buyer_fee_basis_points}</p>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <label>Created date</label>
                                              </div>
                                              <div className="col-md-8">
                                                  <p>{assetData.asset_contract.created_date}</p>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <label>description</label>
                                              </div>
                                              <div className="col-md-8">
                                                  <p>{(assetData.asset_contract.description)?assetData.asset_contract.description:"Null"}</p>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-4">
                                                  <label>Collection name</label>
                                              </div>
                                              <div className="col-md-8">
                                                  <p>{assetData.collection.name}</p>
                                              </div>
                                          </div>
                              </div>
                          </div>
                      </div>
                  </div>         
                </div>
              </div>
              );
          })
        }
      
        
      </div>
    </div>
  );
};

export default Minter;
