import React, {useState} from 'react';

//styles
import styles from "./styles.module.css";

//components
import Button from '../Button';
import OpinionItem from '../OpinionItem';
import SelectInput from '../SelectInput';
import { useTranslation } from 'react-i18next';

interface OpinionsProps {
    opinions: string[],
    questions: string[],
    post_opinion_value: string,
    post_question_value: string,
    handleChange_input_post_question: (value:string) => void,
    handleChange_input_post_opinion: (value:string) => void,

    handlePostQuestion: () => void,
}
function OpinionList({
    opinions, 
    questions, 
    post_opinion_value, 
    post_question_value, 
    handleChange_input_post_question, 
    handleChange_input_post_opinion,

    handlePostQuestion,
}:OpinionsProps) {
    const [t, i18n] = useTranslation("global"); 

    const [tap, setTap] = useState<string>("questions");

    const changeSelectInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // setState({ ...state, [event.target.name]: event.target.value.trim() });
    };

    const [createQuestion, setCreateQuestion] = useState<boolean>(false);

    return (
        <div className={styles.opinions_container}>
            <div className={styles.tap}>
                {/* <h2 className={tap === "opinions" && styles.tap_selected} onClick={() => setTap("opinions")}>Opiniones</h2> */}
                <h2 className={tap === "questions" && styles.tap_selected} onClick={() => setTap("questions")}>{t("opinionsComponent.opinions_txt")}</h2>
            </div>

            <div className={styles.row}>
                <div className={styles.select_wrapper}>
                    {/* <SelectInput inputName={"opinions_orderby"} handleChangeSelectInput={changeSelectInput}>
                        <option value="volvo">Más recientes</option>
                        <option value="saab">Menos recientes</option>
                    </SelectInput> */}
                </div>

                <div className={styles.btn_wrapper}>
                    {tap === "opinions" ? 
                        <Button handleClick={() => {}} inverted height="36px">{t("opinionsComponent.write_opinion_txt")}</Button>
                    : 
                        <Button handleClick={() => setCreateQuestion(prev => !prev)} inverted height="36px">{createQuestion ?  "cerrar": t("opinionsComponent.leave_an_opinion_txt")}</Button>
                    }
                </div>
            </div>

            {createQuestion &&
                <div className={styles.post_question}>
                    <input type="area" value={post_question_value} onChange={(e) => handleChange_input_post_question(e.target.value)}/>

                    <div className={styles.post_question_btn_wrapper}>
                        <Button handleClick={() => handlePostQuestion()} height="36px">{t("opinionsComponent.send_txt")}</Button>
                    </div>
                </div>
            }

            {tap === "opinions" ?
                <div className={styles.opinions_list_container}>
                    {opinions?.map((item, index) => (
                        <OpinionItem 
                        key={index}
                        userImg={"/images/user.jpg"}
                        userName={"Luis Vasquez"}
                        userOpinion={"Cuando necesito saber que actividades hacer dejo que d&b sea mi guia"}
                        date={"03/04/2023"}
                        rate={4}
                        />
                    ))}
                    <div className={styles.btn_see_more_wrapper}>
                        {/* <Button handleClick={() => {}} inverted height="36px">Ver más</Button> */}
                    </div>
                </div>
            :
                <div className={styles.opinions_list_container}>
                    {questions?.map((item, index) => (
                        <OpinionItem 
                        key={index}
                        userImg={"/images/user.jpg"}
                        userName={"Daniel Vasquez"}
                        userOpinion={"Cuando necesito saber que actividades hacer dejo que d&b sea mi guia"}
                        date={"03/04/2023"}
                        rate={4}
                        />
                    ))}
                    <div className={styles.btn_see_more_wrapper}>
                        {/* <Button handleClick={() => {}} inverted height="36px">Ver más</Button> */}
                    </div>
                </div>
            }
            
        </div>
    );
}

export default OpinionList;