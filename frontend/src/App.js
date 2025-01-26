import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Pagination,
  Row,
  Spinner,
  Button,
} from "react-bootstrap"; 
import "./App.css"; 

const SearchQuestions = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [feedback, setFeedback] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);  // Track selected question

  // Memoize the searchQuestions function to prevent redefinition on each render
  const searchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL("http://localhost:5000/search");
      const params = {
        page,
        limit: 10,
        type,
      };

      if (query) {
        params.query = query;
      }

      Object.keys(params).forEach(
        (key) => params[key] === "" && delete params[key]
      );

      url.search = new URLSearchParams(params).toString();

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setQuestions(data.questions);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, query, type]); // Add the dependencies of the variables used inside searchQuestions

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchQuestions();
      } else {
        setQuestions([]);
        setTotalCount(0);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query, page, type, searchQuestions]); // Include searchQuestions as a dependency

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOptionSelect = (question, selectedOption) => {
    const correctOption = question.options.find(
      (option) => option.isCorrectAnswer
    );
    const isCorrect = selectedOption.isCorrectAnswer;

    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [question._id]: {  // Use the question's _id as the key
        isCorrect,
        correctAnswer: correctOption ? correctOption.text : "No correct answer found",
        userAnswer: selectedOption.text,
      },
    }));

    setSelectedQuestionId(question._id);  // Set selected question ID
  };

  const handleCheckAnagramAnswer = (question, solution) => {
    // Ensure the current answer is formatted with spaces for comparison
    const formattedAnswer = currentAnswer.split('').join(' ').trim();
    const formattedSolution = solution.split('').join(' ').trim();

    const isCorrect = formattedAnswer === formattedSolution;

    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [question._id]: {  // Use the question's _id as the key
        isCorrect,
        correctAnswer: solution,
        userAnswer: currentAnswer,
      },
    }));

    setCurrentAnswer(""); // Reset currentAnswer after checking
    setSelectedQuestionId(question._id);  // Set selected question ID
  };

  const totalPages = Math.ceil(totalCount / 10); // Fixed the limit value

  return (
    <Container className="main-container">
      <h1 className="my-4 text-center text-primary">Search Questions</h1>

      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Form onSubmit={(e) => e.preventDefault()} >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input mb-3"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12} md={4} className="mx-auto">
          <div className="filter-dropdown-container">
            <DropdownButton
              variant="secondary"
              title={type || "Filter by Type"}
              onSelect={(e) => setType(e)}
              className="filter-dropdown"
            >
              <Dropdown.Item eventKey="">All</Dropdown.Item>
              <Dropdown.Item eventKey="MCQ">MCQ</Dropdown.Item>
              <Dropdown.Item eventKey="ANAGRAM">ANAGRAM</Dropdown.Item>
              <Dropdown.Item eventKey="READ_ALONG">READ_ALONG</Dropdown.Item>
              <Dropdown.Item eventKey="CONTENT_ONLY">CONTENT_ONLY</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mt-4 alert-custom">
          {error}
        </Alert>
      )}

      {loading && !error && (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-4">
          <h5>{totalCount} Questions Found</h5>
          <ul className="list-group question-list">
            {questions.map((question) => (
              <li key={question._id} className="list-group-item question-item">
                <strong>{question.title}</strong> ({question.type})

                {question.type === "MCQ" && (
                  <ul className="mt-2">
                    {question.options.map((option, index) => (
                      <li key={index}>
                        <Button
                          variant="outline-success"
                          className="answer-button"
                          onClick={() => handleOptionSelect(question, option)}
                        >
                          {option.text}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                {question.type === "ANAGRAM" && (
                  <div className="anagram-container">
                    <p>{question.title}</p>
                    <div className="d-flex">
                      {question.blocks.map((block, index) => (
                        block.showInOption && (
                          <Button
                            key={index}
                            variant="outline-info"
                            className="anagram-button"
                            onClick={() => setCurrentAnswer(currentAnswer + block.text)}
                          >
                            {block.text}
                          </Button>
                        )
                      ))}
                    </div>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleCheckAnagramAnswer(question, question.solution)}
                      className="mt-3"
                    >
                      Check Answer
                    </Button>
                  </div>
                )}

                {/* Only show feedback for the selected question */}
                {selectedQuestionId === question._id && feedback[question._id] && (
                  <Alert
                    variant={feedback[question._id].isCorrect ? "success" : "danger"}
                    className="mt-4 feedback-alert"
                  >
                    <h5>Question: {question.title}</h5>
                    <p>Your answer: <strong>{feedback[question._id].userAnswer}</strong></p>
                    <p>Correct Answer: {feedback[question._id].correctAnswer}</p>
                    {feedback[question._id].isCorrect && (
                      <p className="text-success">You answered correctly! Move on to the next one.</p>
                    )}
                    {!feedback[question._id].isCorrect && (
                      <p className="text-danger">Sorry, try again!</p>
                    )}
                  </Alert>
                )}
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              />
              <Pagination.Next
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              />
            </Pagination>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SearchQuestions;
