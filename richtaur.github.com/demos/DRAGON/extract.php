#!/usr/bin/php
<?php

$dragon_ini = file('DRAGON/DRAGON.INI');
foreach ($dragon_ini as $filename) {
	$filename = trim($filename);
	$exploded = explode('.', $filename);
	$filename_sans_extension = array_shift($exploded);

	$extension = array_pop($exploded);
	switch ($extension) {
		case 'IMG':
			$image = read_image($filename, 16);
			break;
		case 'BIG':
			$image = read_image($filename, 32);
			break;
		case 'HUG':
			$image = read_image($filename, 64);
			break;
	}

	if ($image) {
		write_image($image, 'pngdump/' . $filename_sans_extension . '.png');
	}
}

function read_image ($filename, $size) {
	$data = file("DRAGON/$filename");
	$image = imagecreatetruecolor($size, $size);
	$palette = set_palette($image);

	$index = 0;
	for ($y = 0; $y < $size; ++$y) {
		for ($x = 0; $x < $size; ++$x) {
			$color = trim($data[$index++]);
			if (array_key_exists($color, $palette)) {
				//if ($color != '0') {
					imagesetpixel($image, $x, $y, $palette[$color]);
				//}
			} else {
				echo "Missing key: $color.\n";
			}
		}
	}

	return $image;
}

function set_palette ($image) {
	$colors = array(
		'0' => imagecolorallocatealpha($image, 0, 0, 0, 127),
		// guesses
		'1' => imagecolorallocate($image, 0, 0, 255),
		'2' => imagecolorallocate($image, 0, 255, 0),
		'3' => imagecolorallocate($image, 0, 255, 255),
		'4' => imagecolorallocate($image, 255, 0, 0),
		'5' => imagecolorallocate($image, 255, 0, 255),
		// /guesses
		'6' => imagecolorallocate($image, 170, 85, 0),
		'9' => imagecolorallocate($image, 85, 85, 255),
		'10' => imagecolorallocate($image, 85, 255, 85),
		'12' => imagecolorallocate($image, 255, 85, 85),
		'14' => imagecolorallocate($image, 255, 255, 0),
		'15' => imagecolorallocate($image, 255, 255, 255),
		'16' => imagecolorallocate($image, 113, 56, 0),
		'17' => imagecolorallocate($image, 20, 20, 20),
		'18' => imagecolorallocate($image, 32, 32, 32),
		'19' => imagecolorallocate($image, 44, 44, 44),
		'20' => imagecolorallocate($image, 56, 56, 56),
		'21' => imagecolorallocate($image, 69, 69, 69),
		'22' => imagecolorallocate($image, 81, 81, 81),
		'23' => imagecolorallocate($image, 97, 97, 97),
		'24' => imagecolorallocate($image, 113, 113, 113),
		'25' => imagecolorallocate($image, 130, 130, 130),
		'26' => imagecolorallocate($image, 146, 146, 146),
		'27' => imagecolorallocate($image, 162, 162, 162),
		'28' => imagecolorallocate($image, 182, 182, 182),
		'29' => imagecolorallocate($image, 203, 203, 203),
		'30' => imagecolorallocate($image, 227, 227, 227),
		'31' => imagecolorallocate($image, 255, 255, 255),
		'32' => imagecolorallocate($image, 0, 0, 255),
		'34' => imagecolorallocate($image, 125, 0, 255),
		'35' => imagecolorallocate($image, 190, 0, 255),
		'36' => imagecolorallocate($image, 255, 0, 255),
		'37' => imagecolorallocate($image, 255, 0, 190),
		'39' => imagecolorallocate($image, 255, 0, 65),
		'40' => imagecolorallocate($image, 255, 0, 0),
		'41' => imagecolorallocate($image, 255, 65, 0),
		'42' => imagecolorallocate($image, 255, 125, 0),
		'43' => imagecolorallocate($image, 255, 190, 0),
		'44' => imagecolorallocate($image, 255, 255, 0),
		'45' => imagecolorallocate($image, 190, 255, 0),
		'46' => imagecolorallocate($image, 125, 255, 0),
		'48' => imagecolorallocate($image, 0, 255, 0),
		'51' => imagecolorallocate($image, 0, 255, 190),
		'52' => imagecolorallocate($image, 0, 255, 255),
		'53' => imagecolorallocate($image, 0, 190, 255),
		'54' => imagecolorallocate($image, 0, 125, 255),
		'55' => imagecolorallocate($image, 0, 65, 255),
		'56' => imagecolorallocate($image, 125, 125, 255),
		'57' => imagecolorallocate($image, 158, 125, 255),
		'64' => imagecolorallocate($image, 255, 125, 125),
		'65' => imagecolorallocate($image, 255, 158, 125),
		'66' => imagecolorallocate($image, 255, 190, 125),
		'67' => imagecolorallocate($image, 255, 223, 125),
		'88' => imagecolorallocate($image, 255, 182, 182),
		'89' => imagecolorallocate($image, 255, 199, 182),
		'90' => imagecolorallocate($image, 255, 219, 182),
		'106' => imagecolorallocate($image, 56, 0, 113),
		'107' => imagecolorallocate($image, 85, 0, 113),
		'108' => imagecolorallocate($image, 113, 0, 113),
		'112' => imagecolorallocate($image, 113, 0, 0),
		'113' => imagecolorallocate($image, 113, 28, 0),
		'114' => imagecolorallocate($image, 113, 56, 0),
		'115' => imagecolorallocate($image, 113, 85, 0),
		'116' => imagecolorallocate($image, 113, 113, 0),
		'118' => imagecolorallocate($image, 56, 113, 0),
		'119' => imagecolorallocate($image, 28, 113, 0),
		'120' => imagecolorallocate($image, 0, 113, 0),
		'121' => imagecolorallocate($image, 0, 113, 28),
		'127' => imagecolorallocate($image, 0, 28, 113),
		'138' => imagecolorallocate($image, 113, 85, 56),
		'139' => imagecolorallocate($image, 113, 97, 56),
		'162' => imagecolorallocate($image, 113, 97, 81),
		'177' => imagecolorallocate($image, 16, 0, 65),
		'179' => imagecolorallocate($image, 48, 0, 65),
		'180' => imagecolorallocate($image, 65, 0, 65),
		'183' => imagecolorallocate($image, 65, 0, 16),
		'184' => imagecolorallocate($image, 65, 0, 0),
		'185' => imagecolorallocate($image, 65, 16, 0),
		'186' => imagecolorallocate($image, 65, 32, 0),
		'187' => imagecolorallocate($image, 65, 48, 0),
		'188' => imagecolorallocate($image, 65, 65, 0),
		'189' => imagecolorallocate($image, 48, 65, 0),
		'190' => imagecolorallocate($image, 32, 65, 0),
		'191' => imagecolorallocate($image, 16, 65, 0),
		'192' => imagecolorallocate($image, 0, 65, 0)
	);

	for ($i = 1; $i < 63; ++$i) {
		$colors[$i + 192] = imagecolorallocate($image, $i * 4, 0, 0);
	}

	return $colors;
}

function write_image ($image, $filename) {
	echo "Writing $filename ...";
	imagepng($image, $filename);
	echo " done.\n";
}
