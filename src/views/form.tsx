import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/Layout";
import { Button, Switch } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Spinner } from "react-bootstrap";
import { IQuestion } from "../interfaces/question.interface";
import { useDispatch, useSelector } from "react-redux";
import { getFormSelector } from "../store/slices/getFormSlice";
import postFormController from "../controllers/postForm.controller";
import updateFormController from "../controllers/updateForm.controller";
import { postFormSelector } from "../store/slices/postFormSlice";
// import { updateFormSelector } from "../store/slices/updateFormSlice";

type QuestionType =
  | "name"
  | "unique"
  | "phone"
  | "date"
  | "address"
  | "states"
  | "lga"
  | "text"
  | "number"
  | "dropdown"
  | "choice";

const NewForm = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [doc_name, setDocName] = useState<string>("");
  const [doc_description, setDocDescription] = useState<string>("");

  const dispatch = useDispatch();

  const addMoreQuestionField = () => {
    setQuestions((questions) => [
      ...questions,
      {
        question: "",
        questionType: "dropdown",
        options: [{ option: "option 1" }],
        isRequired: false,
      },
    ]);
  };

  const formState = useSelector(getFormSelector);
  const postFormState = useSelector(postFormSelector);
  // const updateFormState = useSelector(updateFormSelector);

  const addQuestionType = (i: number, type: QuestionType) => {
    let qs = [...questions];
    qs[i] = {...qs[i], questionType: type};
    setQuestions(qs);
  };

  const copyQuestion = (i: number) => {
    let qs = [...questions];
    const newQuestion = qs[i];
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (i: number) => {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  };

  const handleOptionValue = (text: string, i: number, j: number) => {
    const optionsOfQuestion: any = [...questions];
    optionsOfQuestion[i].options[j] = {...optionsOfQuestion[i]["options"][j], option: text};
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  };

  const handleQuestionValue = (text: string, i: number) => {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i] = {...optionsOfQuestion[i], question: text};
    setQuestions(optionsOfQuestion);
  };
  const handleQuestionValidation = (text: string, i: number) => {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i] = {...optionsOfQuestion[i], validation: text};
    setQuestions(optionsOfQuestion);
  };
  const handleQuestionDescription = (text: string, i: number) => {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i].qusetionDescription = text;
    setQuestions(optionsOfQuestion);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  };

  const reorder = (
    list: IQuestion[],
    startIndex: number,
    endIndex: number
  ): IQuestion[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const addOption = (i: number) => {
    const optionsOfQuestion: any = [...questions];

    if (optionsOfQuestion[i].options === undefined) {
      optionsOfQuestion[i] = {
        ...optionsOfQuestion[i],
        options: [{ option: "option" }],
      };
    } else if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i] = {
        ...optionsOfQuestion[i],
        options: [
          ...optionsOfQuestion[i]["options"],
          { option: "Option " + (optionsOfQuestion[i].options.length + 1) },
        ],
      };
    } else {
      console.log("Max  5 options ");
    }
    console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  };

  const handleSubmit = () => {
    if (formState.form?._id) {
      dispatch(
        updateFormController({
          _id: formState.form?._id,
          doc_name,
          doc_description,
          questions,
        })
      );
      return;
    }
    dispatch(
      postFormController({
        doc_name,
        doc_description,
        questions,
      })
    );
  };

  const requiredQuestion = (i: number) => {
    const requiredQuestion = [...questions];

    requiredQuestion[i] = {...requiredQuestion[i], isRequired: !requiredQuestion[i].isRequired};

    console.log(requiredQuestion[i].isRequired + " " + i);
    setQuestions(requiredQuestion);
  };

  const removeOption = (i: number, j: number) => {
    const optionsOfQuestion: any = [...questions];
    if (optionsOfQuestion[i].options.length >= 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      console.log(i + "__" + j);
    }
  };

  const questionCard = (question: IQuestion, i: number): JSX.Element => {
    if (
      question.questionType === "name" ||
      question.questionType === "phone" ||
      question.questionType === "date" ||
      question.questionType === "address" ||
      question.questionType === "states" ||
      question.questionType === "lga" ||
      question.questionType === "text" ||
      question.questionType === "number"
    ) {
      return (
        <div
          key={i}
          className="
          my-5 bg-white justify-start
          flex shadow-md rounded-md
           w-[100%] p-10 space-x-12"
        >
          <div className="flex-1 inline-flex flex-col justify-between">
            <select
              className="input-b py-1"
              onChange={(e) =>
                addQuestionType(i, e.target.value as QuestionType)
              }
              value={question.questionType}
            >
              <optgroup label="Defined Fields">
                <option value="name">Name</option>
                <option value="unique">Unique (ID)</option>
                <option value="phone">Phone</option>
                <option value="date">Date</option>
                <option value="address">Address</option>
                <option value="states">States</option>
                <option value="lga">LGA</option>
              </optgroup>
              <optgroup label="Custom Fields">
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="dropdown">Dropdown</option>
                <option value="choice">Choice</option>
              </optgroup>
            </select>
            <div>
              <span className="after:content-['*'] after:text-red-500">
                Required
              </span>{" "}
              <Switch
                checked={question.isRequired}
                onChange={() => requiredQuestion(i)}
              />
            </div>
          </div>
          <div className="flex-4 flex flex-col space-y-2">
            <input
              className="input-b  pb-2 text-xl"
              placeholder="Field label"
              value={question.question}
              onChange={(e) => {
                handleQuestionValue(e.target.value, i);
              }}
            />
            <input
              className="input-b  pb-2 text-gray-500"
              placeholder="Field Description"
              value={question.qusetionDescription}
              onChange={(e) => {
                handleQuestionDescription(e.target.value, i);
              }}
            />
            <div className="inline-flex self-end space-x-4">
              <button className="border-2 rounded-md pulse">
                <ContentCopyIcon
                  className="m-1 text-gray-400"
                  onClick={() => copyQuestion(i)}
                />
              </button>
              <button
                className="border-2 rounded-md border-red-200 pulse"
                onClick={() => deleteQuestion(i)}
              >
                <DeleteOutlineIcon className="m-1" color="error" />
              </button>
              <Button variant="outlined" onClick={() => addMoreQuestionField()}>
                <AddIcon className="mr-1" /> Add Field
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (question.questionType === "unique") {
      return (
        <div
          key={i}
          className="
          my-5 bg-white justify-start
          flex shadow-md rounded-md
           w-[100%] p-10 space-x-12"
        >
          <div className="flex-1 inline-flex flex-col justify-between">
            <select
              className="input-b py-1"
              onChange={(e) =>
                addQuestionType(i, e.target.value as QuestionType)
              }
              value={question.questionType}
            >
              <optgroup label="Defined Fields">
                <option value="name">Name</option>
                <option value="unique">Unique (ID)</option>
                <option value="phone">Phone</option>
                <option value="date">Date</option>
                <option value="address">Address</option>
                <option value="states">States</option>
                <option value="lga">LGA</option>
              </optgroup>
              <optgroup label="Custom Fields">
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="dropdown">Dropdown</option>
                <option value="choice">Choice</option>
              </optgroup>
            </select>
            <div>
              <span className="after:content-['*'] after:text-red-500">
                Required
              </span>{" "}
              <Switch
                checked={question.isRequired}
                onChange={() => requiredQuestion(i)}
              />
            </div>
          </div>
          <div className="flex-4 flex flex-col space-y-2">
            <input
              className="input-b  pb-2 text-xl"
              placeholder="Field label"
              value={question.question}
              onChange={(e) => {
                handleQuestionValue(e.target.value, i);
              }}
            />
            <input
              className="input-b  pb-2 text-xl"
              placeholder="Validation string"
              value={question.validation}
              onChange={(e) => {
                handleQuestionValidation(e.target.value, i);
              }}
            />
            <input
              className="input-b  pb-2 text-gray-500"
              placeholder="Field Description"
              value={question.qusetionDescription}
              onChange={(e) => {
                handleQuestionDescription(e.target.value, i);
              }}
            />
            <div className="inline-flex self-end space-x-4">
              <button className="border-2 rounded-md pulse">
                <ContentCopyIcon
                  className="m-1 text-gray-400"
                  onClick={() => copyQuestion(i)}
                />
              </button>
              <button
                className="border-2 rounded-md border-red-200 pulse"
                onClick={() => deleteQuestion(i)}
              >
                <DeleteOutlineIcon className="m-1" color="error" />
              </button>
              <Button variant="outlined" onClick={() => addMoreQuestionField()}>
                <AddIcon className="mr-1" /> Add Field
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={i}
          className="
          my-5 bg-white justify-start
          flex shadow-md rounded-md
           w-[100%] p-10 space-x-12"
        >
          <div className="flex-1 inline-flex flex-col justify-between">
            <select
              className="input-b py-1"
              onChange={(e) =>
                addQuestionType(i, e.target.value as QuestionType)
              }
              value={question.questionType}
            >
              <optgroup label="Defined Fields">
                <option value="name">Name</option>
                <option value="unique">Unique (ID)</option>
                <option value="phone">Phone</option>
                <option value="date">Date</option>
                <option value="address">Address</option>
                <option value="states">States</option>
                <option value="lga">LGA</option>
              </optgroup>
              <optgroup label="Custom Fields">
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="dropdown">Dropdown</option>
                <option value="choice">Choice</option>
              </optgroup>
            </select>
            <div>
              <span className="after:content-['*'] after:text-red-500">
                Required
              </span>{" "}
              <Switch
                checked={question.isRequired}
                onChange={() => requiredQuestion(i)}
              />
            </div>
          </div>
          <div className="flex-4 flex flex-col space-y-2">
            <input
              className="input-b  pb-2 text-xl"
              placeholder="Field label"
              value={question.question}
              onChange={(e) => {
                handleQuestionValue(e.target.value, i);
              }}
            />
            <input
              className="input-b  pb-2 text-gray-500"
              placeholder="Field Description"
              value={question.qusetionDescription}
              onChange={(e) => {
                handleQuestionDescription(e.target.value, i);
              }}
            />
            <div className="inline-flex flex-col space-y-1">
              <p className="font-bold">Choices: </p>
              {question?.options?.map((option, j) => (
                <>
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      className="input-b w-[30%]"
                      placeholder="option label"
                      value={question && question!.options![j].option}
                      onChange={(e) => {
                        handleOptionValue(e.target.value, i, j);
                      }}
                    />{" "}
                    <CloseIcon
                      className="ml-2"
                      onClick={() => removeOption(i, j)}
                    />
                  </div>
                </>
              ))}
              <div className="">
                <Button onClick={() => addOption(i)}>Add option</Button>
              </div>
            </div>
            <div className="inline-flex self-end space-x-4">
              <button className="border-2 rounded-md pulse">
                <ContentCopyIcon
                  className="m-1 text-gray-400"
                  onClick={() => copyQuestion(i)}
                />
              </button>
              <button
                className="border-2 rounded-md border-red-200 pulse"
                onClick={() => deleteQuestion(i)}
              >
                <DeleteOutlineIcon className="m-1" color="error" />
              </button>
              <Button variant="outlined" onClick={() => addMoreQuestionField()}>
                <AddIcon className="mr-1" /> Add Field
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  const questionUI = (): JSX.Element[] => {
    return questions.map((question, i) => (
      <Draggable key={1 + i + "id"} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {questionCard(question, i)}
          </div>
        )}
      </Draggable>
    ));
  };

  useEffect(() => {
    if (formState.form) {
      setDocName(formState.form?.doc_name!);
      setDocDescription(formState.form?.doc_description!);
      setQuestions(formState.form?.questions!);
    } else {
      const newQuestion = {
        question: "",
        questionDescription: "",
        questionType: "name",
        isRequired: false,
      };
      setQuestions([...questions, newQuestion]);
    }
  }, [formState]);

  return (
    <Layout pageName="Form">
      <div
        className="
        shadow-md rounded-md w-[100%]
        border-t-[#1976d2] border-t-8
        bg-white p-10 flex flex-col space-y-3
          "
      >
        <input
          className="
          text-3xl input-b
          h-12 w-[40%] font-medium px-3"
          placeholder="Untitled Form"
          value={doc_name}
          onChange={(e) => setDocName(e.target.value)}
        />
        <input
          className="input-b px-3"
          placeholder="Form Description"
          value={doc_description}
          onChange={(e) => setDocDescription(e.target.value)}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questionUI()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ fontSize: "14px" }}
      >
        {postFormState.isLoading ? (
          <Spinner animation="border" color="primary" size="sm" />
        ) : (
          "Save"
        )}
      </Button>
    </Layout>
  );
};

export default NewForm;
