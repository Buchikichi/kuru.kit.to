package to.kit.kuru.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * playコントローラー.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/play")
public class PlayController {
	/**
	 * play.
	 * @return 画面
	 */
	@RequestMapping
	public String play() {
		return "play";
	}
}
