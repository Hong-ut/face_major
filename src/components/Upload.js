import React, { useEffect, useState } from "react";
import shortid from "shortid";
import "../styles/Upload.css";
import uploadLogo from "../assets/png/upload.png";
// import {ImageModel} from 'react-teachable-machine';
import * as tmImage from "@teachablemachine/image";
import Loading from "./Loading";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

const URL = "https://teachablemachine.withgoogle.com/models/ims18YRgK/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

let model;

const Upload = () => {
  const [selectedfile, SetSelectedFile] = useState([]);
  // const [Files, SetFiles] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log(selectedfile);
  }, [selectedfile]);

  async function init() {
    model = await tmImage.load(modelURL, metadataURL);
  }

  async function predict() {
    // predict can take in an image, video or canvas html element
    model = await tmImage.load(modelURL, metadataURL);
    const tempImage = document.getElementById("srcImg");
    const prediction = await model.predict(tempImage, false);
    prediction.sort(
      (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
    );
    // console.log(prediction.slice(0, 5));
    setResult(prediction.slice(0, 5));
  }

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e) => {
    // --For Multiple File Input
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        SetSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              id: shortid.generate(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              // datetime:
              // e.target.files[i].lastModifiedDate.toLocaleString("en-IN"),
              filesize: filesizes(e.target.files[i].size),
            },
          ];
        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
        console.log(file);
        init().then(console.log("init 모델"), predict());
      }
    }
  };
  // this handler function doesn't matter because only the selectedFile matters (this updates Files)
  // const FileUploadSubmit = async (e) => {
  //   e.preventDefault();

  //   // form reset on submit
  //   e.target.reset();
  //   if (selectedfile.length > 0) {
  //     for (let index = 0; index < selectedfile.length; index++) {
  //       SetFiles((preValue) => {
  //         return [...preValue, selectedfile[index]];
  //       });
  //     }
  //     SetSelectedFile([]);
  //   } else {
  //     alert("Please select file");
  //   }
  //   // console.log('test')
  // };

  const output_prompts = {
    "Computer Science": `In computer science, distinctive facial structures often encompass open and 
    inquisitive eyes that reflect deep curiosity. You might notice a determined jawline, signifying 
    resilience in tackling complex challenges. Remarkable computer scientists like Ada Lovelace, Alan Turing, and 
    Grace Hopper shared these facial traits. 💡`,

    Chemistry: `The field of chemistry frequently associates distinct facial attributes with chemists. An intense gaze 
    often denotes their focus on intricate details. You might notice a studious brow, indicating their commitment to 
    precision, and a poised jawline, reflecting determination. Pioneers such as Marie Curie, Dmitri Mendeleev, and 
    Linus Pauling shared these distinct facial features. 🧪`,

    Biology: `Biology enthusiasts often exhibit specific facial characteristics. An observant and perceptive look 
    reflects their deep fascination with the natural world. You may notice a harmonious brow symbolizing their 
    curiosity, and an expressive countenance mirroring their passion for life's intricacies. Visionaries like 
    Charles Darwin, Jane Goodall, and Rosalind Franklin shared these distinctive facial features. 🌿`,

    Education: `Educators typically possess inviting and understanding facial expressions. An empathetic look 
    signifies their patient and empathetic nature. You may observe a kind and attentive gaze reflecting their 
    commitment to nurturing young minds. Influential educators like Maria Montessori, John Dewey, and Malala 
    Yousafzai shared these distinctive facial attributes. 📚`,

    "English Literature": `In the realm of English literature, individuals often have discerning and contemplative 
    facial expressions. An expressive brow reflects their connection to narratives and a poetic sensibility. You might 
    notice a thoughtful and imaginative gaze that signifies their passion for storytelling. Literary giants like William 
    Shakespeare, Jane Austen, and Charles Dickens shared these distinct facial features. 📖`,

    Engineering: `Engineers commonly exhibit specific facial attributes. A focused and analytical look indicates 
    dedication to designing innovative solutions. You may notice a determined jawline mirroring their resilience 
    and a visionary brow reflecting their creative problem-solving skills. Engineering luminaries like Nikola 
    Tesla, Thomas Edison, and Grace Hopper shared these distinctive facial attributes. 🔧`,

    "Environmental Studies": `Individuals dedicated to environmental studies often convey eco-consciousness through 
    their facial features. A serene and thoughtful gaze signifies commitment to sustainability, and an environmentally 
    aware brow reflects their dedication to preserving the planet. These facial attributes embody the commitment of 
    environmental champions like Rachel Carson, Wangari Maathai, and David Attenborough to safeguarding our 
    environment. 🌍`,

    "Fine Arts": `The world of fine arts often recognizes individuals with unique facial 
    expressions. A vivid and expressive countenance showcases their passion for aesthetics and 
    self-expression. You may observe artistic brows and an emotional depth in their gaze 
    reflecting their artistic souls. Visionaries like Leonardo da Vinci, Frida Kahlo, and 
    Vincent van Gogh shared these distinctive facial attributes. 🎨`,

    "Health Sciences": `Healthcare professionals typically have compassionate and caring facial expressions. 
    A poised brow symbolizes their attention to detail, and a reassuring countenance mirrors their empathy. You may 
    notice an attentive and understanding gaze reflecting their commitment to well-being. Healthcare heroes like 
    Florence Nightingale, Jonas Salk, and Marie Stopes shared these distinct facial attributes. ⚕️`,

    Mathematics: `Mathematicians often possess contemplative and analytical facial expressions. 
    A studious brow signifies their commitment to precision and logical thinking. You might notice
     a focused and determined countenance mirroring their dedication to solving complex problems. 
     Mathematical geniuses like Pythagoras, Ada Lovelace, and Leonhard Euler shared these distinct 
     facial attributes. 🔢`,

    Music: `Musicians often have melodious and expressive facial expressions. Musical brows and 
    a soulful gaze symbolize their passion for rhythm and harmony. You may observe an artistic and 
    imaginative countenance that reflects their artistic souls. Legendary musicians like Ludwig van 
    Beethoven, Aretha Franklin, and Wolfgang Amadeus Mozart shared these distinctive facial 
    attributes. 🎶`,

    Physics: `Physicists often have inquisitive and probing gazes that reflect their fascination
     with the fundamental laws of the universe. An observant brow signifies their dedication to 
     exploring the mysteries of space and time. Pioneers like Albert Einstein, Marie Curie, and Richard 
     Feynman shared these distinctive facial attributes. 🌌`,

    "Political Sciences": `Individuals drawn to political science often possess a determined and insightful gaze, 
    indicative of their commitment to understanding complex social and political dynamics. A thoughtful brow 
    symbolizes their critical thinking and analysis. Political visionaries like Nelson Mandela, Eleanor Roosevelt, and
     Winston Churchill shared these distinct facial attributes. 🌐`,

    "Business Administration": `In the world of business administration, individuals often exhibit a poised and 
    determined look. A shrewd and analytical brow signifies their commitment to problem-solving and innovation. 
    You may notice a confident jawline symbolizing their resolute decision-making. Business tycoons like Warren Buffett, 
    Sheryl Sandberg, and Elon Musk shared these distinctive facial attributes. 💼`,

    History: `Historians often possess reflective and discerning gazes that reveal their deep engagement with 
    the past. A contemplative brow symbolizes their dedication to uncovering historical truths, and a jawline that 
    signifies their resilience in navigating complex historical contexts. Influential historians like Herodotus, Annales 
    School scholars, and Howard Zinn shared these distinctive facial attributes. 📜`,
  };

  const emojis = {
    "Computer Science": "💻",
    Chemistry: "🧪",
    Biology: "🌱",
    Education: "📚",
    "English Literature": "📖",
    Engineering: "🛠️",
    "Environmental Studies": "🌍",
    "Fine Arts": "🎨",
    "Health Sciences": "⚕️",
    Mathematics: "🔢",
    Music: "🎶",
    Physics: "🌌",
    "Political Sciences": "🌐",
    "Business Administration": "💼",
    History: "📜",
  };

  const currentUrl = window.location.href;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="row justify-content-center h-100">
      <div className="col-md-8">
        {selectedfile.length === 0 ? (
          <div className="card ">
            <div className="card-body">
              {/* justify-center => center items HORIZONTALL 
                          justify-center => center items VERTICALLY */}
              <div className="kb-data-box flex flex-col items-center justify-center">
                <form
                  className="h-full w-4/6 ml-60 mr-60"
                  onSubmit={() => console.log("test")}
                >
                  <div className="kb-file-upload ">
                    <div className="file-upload-box form-container h-100 flex flex-col items-center justify-center rounded-3xl">
                      <input
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={InputChange}
                        // multiple
                      />

                      <img
                        src={uploadLogo}
                        className="object-contain h-36 w-96 mb-4 non-hoverable-image cursor-none"
                        alt="Upload Logo"
                      />
                      <h1 className="text-xl font-bold ml-20 mr-20 text-center font-ad">
                        Upload a Photo of Yourself
                      </h1>
                    </div>
                  </div>
                </form>
                <h1 className="mt-2 font-ad text-xl cursor-default">
                  *Disclaimer: We Never Save Your Photos*
                </h1>

                <div className="p-4">
                  <button
                    className="custom-pink-bg font-ad text-white text-lg font-semibold py-2 px-4 rounded-xl hover:bg-red-400 focus:outline-none focus:shadow-outline"
                    style={{ cursor: "pointer" }}
                    onClick={openModal}
                  >
                    How Does AI Find Your Ideal Major?
                  </button>
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow-lg z-50 p-4">
                        <p className="font-ad text-black text-lg">
                          Our Machine Learning Model, trained on 100,000 facial
                          data samples from successful professionals, selects
                          your ideal major based on your facial attributes, with
                          gender and racial bias addressed through meticulous
                          data processing.
                        </p>
                        <button
                          className="mt-3 custom-pink-bg font-ad text-white text-lg font-semibold py-2 px-4 rounded-xl hover:bg-red-400 focus:outline-none focus:shadow-outline"
                          style={{ cursor: "pointer" }}
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-2 mt-14  ">
            <div className="card-body">
              {/* justify-center => center items HORIZONTALL 
                    justify-center => center items VERTICALLY */}
              <div className="kb-data-box h-100 flex items-center justify-center">
                <div className="flex flex-col overflow-hidden justify-center items-center">
                  <div className="m-10 w-2/5">
                    <div className="file-upload-box flex flex-col">
                      {selectedfile.map((data, index) => {
                        const {
                          id,
                          filename,
                          // filetype,
                          fileimage,
                          // datetime,
                          // filesize,
                        } = data;

                        return (
                          <div key={id} className="w-full">
                            {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                              <img
                                id="srcImg"
                                src={fileimage}
                                alt=""
                                className="w-full h-auto rounded-xl"
                              />
                            ) : (
                              <div className="file-image">
                                <i className="far fa-file-alt"></i>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="card-2-2 mt-3">
                    <div className="card-body">
                      {result.length > 0 ? (
                        // Conditionally render the <p> tag based on the first element of 'result'
                        <>
                          <h1 className="text-4xl font-bold custom-pink-text mb-2">
                            {result[0].className} {emojis[result[0].className]}
                          </h1>
                          <p className="output_prompt">
                            {output_prompts[result[0].className]}
                          </p>
                        </>
                      ) : (
                        <>
                          <Loading />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center w-full">
                    {result.map((item, index) => {
                      const classNames = [
                        "first",
                        "second",
                        "third",
                        "fourth",
                        "fifth",
                        "first",
                      ];

                      const boxClassName = classNames[index]; // Get the appropriate class name

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center w-5/6"
                        >
                          <div className="w-2/5 text-left">
                            <h1 className="major_output font-ad">
                              {item.className === "Business Administration"
                                ? "Business"
                                : item.className === "English Literature"
                                ? "Literature"
                                : item.className}
                            </h1>
                          </div>
                          <div
                            className={`${boxClassName}-box w-3/5 m-1 flex items-center justify-center`}
                          >
                            <div
                              className={`${boxClassName}-bar flex items-center justify-center min-w-[6%] text-white text-sm font-bold`}
                              style={{
                                width: `${item.probability * 100}%`,
                              }}
                            >
                              <h1 className="text-center align-middle text-medium">
                                {Math.round(item.probability * 100).toString() +
                                  "%"}
                              </h1>
                            </div>
                          </div>

                          {/* You can add more content here */}
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <div className="mt-4">
                      <FacebookShareButton
                        style={{ marginRight: "20px" }}
                        url={currentUrl}
                      >
                        <FacebookIcon
                          size={48}
                          round={true}
                          borderRadius={24}
                        ></FacebookIcon>
                      </FacebookShareButton>
                      <FacebookMessengerShareButton
                        style={{ marginRight: "20px" }}
                        url={currentUrl}
                      >
                        <FacebookMessengerIcon
                          size={48}
                          round={true}
                          borderRadius={24}
                        ></FacebookMessengerIcon>
                      </FacebookMessengerShareButton>
                      <TwitterShareButton
                        style={{ marginRight: "20px" }}
                        url={currentUrl}
                      >
                        <TwitterIcon
                          size={48}
                          round={true}
                          borderRadius={24}
                        ></TwitterIcon>
                      </TwitterShareButton>
                      <LineShareButton url={currentUrl}>
                        <LineIcon
                          size={48}
                          round={true}
                          borderRadius={24}
                        ></LineIcon>
                      </LineShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
