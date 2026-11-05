@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000") // Allow Next.js to talk to Java
public class PrismixController {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private PostRepository postRepository; // Your JPA Repository

    // Endpoint 1: Generate (Dynamic Interaction)
    @PostMapping("/generate")
    public ResponseEntity<String> generateIdea(@Valid @RequestBody PostRequest request) {
        String aiResponse = openAIService.generatePost(request.getTopic(), request.getPlatform());
        return ResponseEntity.ok(aiResponse);
    }

    // Endpoint 2: Save to DB (Write Interaction)
    @PostMapping("/save")
    public ResponseEntity<SocialPost> savePost(@RequestBody SocialPost post) {
        SocialPost saved = postRepository.save(post);
        return ResponseEntity.ok(saved);
    }
}