import React from "react";
import {
  Alert,
  Pagination,
  Spinner,
  Button,
  Container,
} from "react-bootstrap";
import "./SearchOutput.css";

const SearchOutput = ({
  questions,
  loading,
  error,
  totalPages,
  page,
  handlePageChange,
}) => {
  return (
    <Container className="search-output-container">
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
          <h5>{questions.length} Questions Found</h5>
          <ul className="list-group question-list">
            {questions.map((question) => (
              <li key={question._id} className="list-group-item question-item">
                <strong>{question.title}</strong> ({question.type})
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              />
              <Pagination.Item>{page}</Pagination.Item>
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

export default SearchOutput;
