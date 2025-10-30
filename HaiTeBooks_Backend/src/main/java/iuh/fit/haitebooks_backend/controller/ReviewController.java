package iuh.fit.haitebooks_backend.controller;

import iuh.fit.haitebooks_backend.dtos.response.ReviewResponse;
import iuh.fit.haitebooks_backend.model.Review;
import iuh.fit.haitebooks_backend.model.Book;
import iuh.fit.haitebooks_backend.model.User;
import iuh.fit.haitebooks_backend.repository.ReviewRepository;
import iuh.fit.haitebooks_backend.repository.BookRepository;
import iuh.fit.haitebooks_backend.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*") // Cho phép FE truy cập
public class ReviewController {

    private static final Logger logger = LoggerFactory.getLogger(ReviewController.class);

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public ReviewController(ReviewRepository reviewRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    // 📚 Lấy toàn bộ review
    @GetMapping
    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(review -> new ReviewResponse(
                        review.getId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreated_at(),
                        review.getBook() != null ? review.getBook().getId() : null,
                        review.getBook() != null ? review.getBook().getTitle() : null,
                        review.getUser() != null ? review.getUser().getId() : null,
                        review.getUser() != null ? review.getUser().getUsername() : null
                ))
                .toList();
    }

    // 🧍 Lấy review theo user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        logger.info("Fetching reviews by user id: {}", userId);
        List<Review> reviews = reviewRepository.findByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    // 📖 Lấy review theo book
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBook(@PathVariable Long bookId) {
        logger.info("Fetching reviews by book id: {}", bookId);
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        return ResponseEntity.ok(reviews);
    }

    // ➕ Tạo mới review
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review reviewRequest) {
        logger.info("Creating review for book ID {} by user ID {}",
                reviewRequest.getBook().getId(), reviewRequest.getUser().getId());

        Book book = bookRepository.findById(reviewRequest.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        User user = userRepository.findById(reviewRequest.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setBook(book);
        review.setUser(user);
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setCreated_at(LocalDateTime.now());

        Review saved = reviewRepository.save(review);
        logger.info("✅ Review created successfully with ID {}", saved.getId());
        return ResponseEntity.ok(saved);
    }

    // ✏️ Cập nhật review
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        logger.info("Updating review ID {}", id);
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        review.setRating(updatedReview.getRating());
        review.setComment(updatedReview.getComment());
        Review saved = reviewRepository.save(review);
        logger.info("✅ Review updated successfully with ID {}", id);
        return ResponseEntity.ok(saved);
    }

    // ❌ Xoá review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        logger.warn("Deleting review ID {}", id);
        reviewRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
