package to.kit.kuru.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * インデックスコントローラー.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/")
public class IndexController {
	/**
	 * メニュー.
	 * @return 画面
	 */
	@RequestMapping
	public String index() {
		return "index";
	}
}
