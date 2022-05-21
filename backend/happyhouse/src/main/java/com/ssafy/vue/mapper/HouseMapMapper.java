package com.ssafy.vue.mapper;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.vue.dto.HouseDealDto;
import com.ssafy.vue.dto.HouseInfoDto;
import com.ssafy.vue.dto.SidoGugunCodeDto;

public interface HouseMapMapper {

	List<SidoGugunCodeDto> getSido() throws SQLException;
	List<SidoGugunCodeDto> getGugunInSido(String sido) throws SQLException;
	List<HouseInfoDto> getDongInGugun(String gugun) throws SQLException;
	List<HouseInfoDto> getAptInGugun(String gugn) throws SQLException;
	List<HouseInfoDto> getAptInDong(String dong) throws SQLException;
	List<HouseInfoDto> getAptInName_gugun(String aptName, String gugun) throws SQLException;
	List<HouseInfoDto> getAptInName_dong(String aptName, String dong) throws SQLException;
	List<HouseDealDto> getAptDetail(String aptCode) throws SQLException;
	
}